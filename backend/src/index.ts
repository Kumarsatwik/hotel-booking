import { envConfig } from "./config/envConfig";
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

import dbConnect from "./config/dbConnect";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/my-hotels";

dbConnect();

cloudinary.config({
  cloud_name: envConfig.get("cloudinary_cloud_name"),
  api_key: envConfig.get("cloudinary_api_key"),
  api_secret: envConfig.get("cloudinary_api_secret"),
});

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
app.use("/api/hotels", hotelRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Page not found" });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
