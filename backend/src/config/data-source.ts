import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
config({ quiet: true });


// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL!,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, '../entities/**/*.{js,ts}')],
    migrations: [path.join(__dirname, '../migrations/**/*.{js,ts}')],
    migrationsTableName: "migrations",
});

export const dbConnect = async () => {
    await db.initialize()
        .then(async () => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log("Error during Data Source initialization:", error);
        });

}