import express from "express";
import {
  loginController,
  tokenVerification,
  logoutController,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/login", loginController);
router.get("/validate-token", verifyToken, tokenVerification);
router.post("/logout", logoutController);

export default router;
