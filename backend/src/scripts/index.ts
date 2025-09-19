import { logger } from "@/utils/logger";
import { seedUsersSafe } from "./seed-users-raw"

export const runScript = async () => {
    try {
        await seedUsersSafe();

    } catch (error) {
        logger.error(`❌ Error running script: ${error}`);

    }
}

runScript().then(() => {
    logger.info("✅ Script completed");
    process.exit(0);
}).catch((error) => {
    logger.error(`❌ Script failed: ${error}`);
    process.exit(1);
});