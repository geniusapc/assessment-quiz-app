import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { env } from "./env";
import { logger } from "@/utils/logger";



export const db = new DataSource({
    type: "postgres",
    url: env.DATABASE_URL,
    synchronize: true, // ⚠️ auto-create tables in dev, disable in prod
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    logger: 'simple-console'
});

export const dbConnect = async () => {
    await db.initialize()
        .then(async () => {
            logger.debug("Database connected");
        })
        .catch((error) => {
            console.log("Error during Data Source initialization:", error);
            logger.error("Error connecting to DB", error);
        });

}