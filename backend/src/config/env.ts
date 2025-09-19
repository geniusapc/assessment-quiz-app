import dotenv from "dotenv";
import { cleanEnv, str, port, bool } from "envalid";

dotenv.config({ quiet: true });

export const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "test", "production"],
        default: "development",
    }),
    PORT: port({ default: 8080 }),
    CORS_ORIGIN: str({ default: "*" }),
    ENABLE_REQUEST_LOG: bool({ default: false }),
    DATABASE_URL: str(),
    ACCESS_TOKEN_SECRET: str(),
    ACCESS_EXPIRY: str({ default: '1d' }),
});
