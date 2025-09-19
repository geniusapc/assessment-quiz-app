import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { dbConnect } from "./config/data-source";


const main = async () => {
  await dbConnect();

  app.listen(env.PORT, () => {
    logger.debug(`Server running on PORT ${env.PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});

