import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, async () => {
  console.log(`Server Running in PORT ${PORT} `);
});
