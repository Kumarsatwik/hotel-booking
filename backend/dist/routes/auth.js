"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.loginController);
router.get("/validate-token", auth_1.verifyToken, auth_controller_1.tokenVerification);
router.post("/logout", auth_controller_1.logoutController);
exports.default = router;
