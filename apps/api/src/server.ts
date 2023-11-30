import express from "express";
import { initializeTrpc } from "./trpc/router";

const app = express();

app.get('/', (_req, res) => {
  res.send('Welcome to my server!');
});

// trpc
initializeTrpc(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});