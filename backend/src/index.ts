import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import dbConnect from "./config/dbConnect";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
