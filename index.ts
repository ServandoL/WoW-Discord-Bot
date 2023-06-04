import { GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';
import { BnetHttpClient } from './src/common/BnetHttpClient';
import express from 'express';

const app = express();
app.use('/', (_req, res) => {
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
app.use('/health', (_req, res) => {
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
  console.info(`Server is running on port ${AppConfig.instance.port}`);
});
// Create the battle.net auth client instance
BnetHttpClient.start();

// Create a new client instance
DiscordClient.start({ intents: [GatewayIntentBits.Guilds] });

// initialize function to get all commands
DiscordClient.instance.initialize();
// handle events
DiscordClient.instance.events.forEach((ev) => {
  if (ev.once !== undefined) {
    DiscordClient.instance.once(ev.name, async (...args) => {
      try {
        await ev.execute(...args);
      } catch (error: any) {
        console.error(JSON.stringify(error));
      }
    });
  } else {
    DiscordClient.instance.on(ev.name, async (...args) => {
      try {
        await ev.execute(...args);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    });
  }
});

// Log in to Discord with client token
DiscordClient.instance.login(AppConfig.instance.token).catch((error) => {
  console.error('An error occurred while the bot was trying to log in.');
  throw new Error(error);
});
