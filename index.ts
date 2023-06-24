import express from 'express';
import startDiscordApp from './main';
import { AppConfig } from './src/AppConfig';
import { logger } from './src/logger';
(async () => {
  const app = express();
  app.get('/health', (_req, res) => {
    const health = {
      uptime: process.uptime(),
      message: 'OK',
      tms: new Date().toISOString()
    };
    try {
      res.status(200).send(health);
    } catch (error) {
      health.message = JSON.stringify(error);
      res.status(503).send(health);
    }
  });
  app.listen(AppConfig.instance.port, () => {
    logger.info(`The server is listening on port ${AppConfig.instance.port}`);
  });
  await startDiscordApp();
})().catch((error) => {
  logger.error(
    `An error occurred during app startup. ${JSON.stringify({ message: error.message, stacktrace: error.stack })}`
  );
});
