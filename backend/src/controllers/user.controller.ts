import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { validationResult } from "express-validator";

export const userController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      envConfig.get("jwtPrivateKey"),
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: envConfig.get("node_env") === "production",
      maxAge: 864000000,
    });
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
