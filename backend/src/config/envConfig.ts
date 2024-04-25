import "dotenv/config";
const _config = {
  mongodbUrl: process.env.MONGODB_URI as string,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY as string,
  node_env: process.env.NODE_ENV as string,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

// export const envConfig=Object.freeze(_config)
export const envConfig = {
  get(key: string) {
    const value = _config[key as keyof typeof _config];
    if (!value) {
      console.log(`${key} key not found in .env/envConfig file`);
      process.exit(1);
    }
    return value;
  },
};
