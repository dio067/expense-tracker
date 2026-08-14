import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { port } from "./config";
import appRoutes from "./routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", appRoutes);

app.get("/");
app.listen(port, async () => {
  console.log(`Server Running in PORT ${port} `);
});
