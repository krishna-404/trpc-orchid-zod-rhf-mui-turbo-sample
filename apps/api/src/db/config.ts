import envConfig from "../configs/config";

const dbUrl = 'postgres://' + envConfig.DB_USER + ':' + envConfig.DB_PASS + 
  '@' + envConfig.DB_HOST + ':' + envConfig.DB_PORT +
  '/' + envConfig.DB_NAME + '?ssl=' + envConfig.NODE_ENV === 'dev' ? 'true' : 'false';

const database = {
  databaseURL: dbUrl,
};
if (!database.databaseURL) throw new Error('DATABASE_URL is missing in .env');

const testDatabase = {
  databaseURL: '',
};

const allDatabases = [database];

if (testDatabase.databaseURL) {
  allDatabases.push(testDatabase);
}

export const dbConfig = {
  allDatabases,
  database: process.env.NODE_ENV === 'test' ? testDatabase : database,
};
