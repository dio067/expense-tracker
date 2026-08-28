import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { port } from "./config";
import helmet from "helmet";
import appRoutes from "./routes";
const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", appRoutes);

app.use((req, res) =>
  res.status(404).json({ ok: false, message: "Not found" }),
);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

app.listen(port, async () => {
  console.log(`Server Running in PORT ${port} `);
});
