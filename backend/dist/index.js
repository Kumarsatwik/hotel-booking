"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = require("./config/envConfig");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cloudinary_1 = require("cloudinary");
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
(0, dbConnect_1.default)();
cloudinary_1.v2.config({
    cloud_name: envConfig_1.envConfig.get("cloudinary_cloud_name"),
    api_key: envConfig_1.envConfig.get("cloudinary_api_key"),
    api_secret: envConfig_1.envConfig.get("cloudinary_api_secret"),
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
