import express from 'express';
import startDiscordApp from './main';
import { AppConfig } from './src/AppConfig';
(async () => {
  const app = express();
  app.get('/', (_req, res) => {
    const message = {
      message:
        // eslint-disable-next-line quotes
        "Thank you for using my bot. I don't collect any of your information but I do use Blizzard's services for my data. As per Blizzard, I have to include their Privacy Policy. You can view it here: https://www.blizzard.com/en-us/legal/a4380ee5-5c8d-4e3b-83b7-ea26d01a9918/blizzard-entertainment-online-privacy-policy"
    };
    try {
      res.status(200).send(message);
    } catch (error) {
      message.message = JSON.stringify(error);
      res.status(503).send(message);
    }
  });
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
    console.info(`The server is listening on port ${AppConfig.instance.port}`);
  });
  await startDiscordApp();
})().catch((error) => {
  console.log(
    `An error occurred during app startup. ${JSON.stringify({ message: error.message, stacktrace: error.stack })}`
  );
});
