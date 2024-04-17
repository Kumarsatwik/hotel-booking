"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerification = exports.logoutController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../config/envConfig");
const express_validator_1 = require("express-validator");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({
            email,
        });
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, envConfig_1.envConfig.get("jwtPrivateKey"), {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: envConfig_1.envConfig.get("node_env") === "production",
            maxAge: 86400000,
        });
        return res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.sendStatus(200);
});
exports.logoutController = logoutController;
const tokenVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ userId: req.userId });
});
exports.tokenVerification = tokenVerification;
