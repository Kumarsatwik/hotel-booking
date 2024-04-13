import { envConfig } from "./envConfig";
import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongodbUrl = envConfig.get("mongdbUrl");
    await mongoose.connect(mongodbUrl as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
