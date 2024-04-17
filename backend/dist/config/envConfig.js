"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const _config = {
    mongodbUrl: process.env.MONGODB_URI,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
    node_env: process.env.NODE_ENV,
};
// export const envConfig=Object.freeze(_config)
exports.envConfig = {
    get(key) {
        const value = _config[key];
        if (!value) {
            console.log(`${key} key not found in .env/envConfig file`);
            process.exit(1);
        }
        return value;
    },
};
