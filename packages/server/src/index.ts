import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { port } from "./config";

const app = express();

app.listen(port, async () => {
  console.log(`Server Running in PORT ${port} `);
});
