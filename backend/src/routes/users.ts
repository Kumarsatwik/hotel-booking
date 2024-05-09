import express, { Request, Response } from "express";

import {
  userController,
  userDetailsController,
} from "../controllers/user.controller";
import { check } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("password", "Password with 6 or more characters required")
      .isString()
      .isLength({ min: 6 }),
    check("email", "Email is required").isString(),
  ],
  userController
);

router.get("/me", verifyToken, userDetailsController);

export default router;
