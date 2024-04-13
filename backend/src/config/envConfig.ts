const _config = {
  mongdbUrl: process.env.MONGODB_URI as string,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY as string,
  node_env: process.env.NODE_ENV as string,
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
