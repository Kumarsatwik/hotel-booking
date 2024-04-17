import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import dbConnect from "./config/dbConnect";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

dbConnect();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
