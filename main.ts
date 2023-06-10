import { GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';
import { BnetHttpClient } from './src/common/BnetHttpClient';
import { APP_TYPE } from './src/common/defaults';
import { deployCommands } from './src/deploy.commands';
import cron from 'node-cron';
import { logger } from './src/logger';
import { MongoClientContext } from './src/common/MongoClientContext';

export default async function startDiscordApp(): Promise<void> {
  if (AppConfig.instance.type === APP_TYPE.COMMANDS) {
    try {
      await deployCommands();
    } catch (error: any) {
      logger.error('Rest call failed to deploy commands');
      throw new Error(error);
    }
  } else {
    // Create the battle.net auth client instance
    await MongoClientContext.start();
    BnetHttpClient.start();

    // Create a new client instance
    DiscordClient.start({ intents: [GatewayIntentBits.Guilds] });

    // initialize function to get all commands
    DiscordClient.instance.initialize();
    // handle events
    DiscordClient.instance.events.forEach((ev) => {
      if (ev.once) {
        DiscordClient.instance.once(ev.name, async (...args) => {
          try {
            await ev.execute(...args);
          } catch (error: any) {
            logger.error(JSON.stringify(error));
          }
        });
      } else {
        DiscordClient.instance.on(ev.name, async (...args) => {
          try {
            await ev.execute(...args);
          } catch (error) {
            logger.error(JSON.stringify(error));
          }
        });
      }
    });

    // TODO: Send a random fact every day
    cron.schedule('* * * * *', () => {
      logger.info('task every minute');
    });

    // Log in to Discord with client token
    DiscordClient.instance.login(AppConfig.instance.token).catch((error) => {
      logger.error('An error occurred while the bot was trying to log in.');
      throw new Error(error);
    });
  }
}
