import { Server } from "http";
import { raw } from "orchid-orm";
import app from "./app";
import { logger } from "./configs/logger";
import { db } from "./db/db";
import envConfig from "./configs/config";

let server: Server;

db.$query(raw`SELECT * FROM information_schema.tables;`).then(
  (tables) => {
    // logger.debug(Object.keys(tables).join(', '));
    if (tables.rowCount > 0){
      logger.info(`Connected to SQL Database`);
      server = app.listen(envConfig.SERVER_PORT, () => {
        logger.info(`Listening to port ${envConfig.SERVER_PORT}`);
      });
    }
    else {
      throw new Error("Database not connected.");
    }
  }
)

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed.');
      process.exit(1);
    });
  }
  else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
      server.close();
  }
});