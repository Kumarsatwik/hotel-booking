import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { validationResult } from "express-validator";

export const loginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ _id: user._id }, envConfig.get("jwtPrivateKey"), {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: envConfig.get("node_env") === "production",

      maxAge: 86400000,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
