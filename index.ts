import { GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';
import { BnetAuthClient } from './src/common/BnetAuthClient';

// Create the battle.net auth client instance
BnetAuthClient.start();

// Create a new client instance
DiscordClient.start({ intents: [GatewayIntentBits.Guilds] });

// initialize function to get all commands
DiscordClient.instance.initialize();
// handle events
DiscordClient.instance.events.forEach((ev) => {
  if (ev.once !== undefined) {
    DiscordClient.instance.once(ev.name, async (...args) => {
      await ev.execute(...args);
    });
  } else {
    DiscordClient.instance.on(ev.name, async (...args) => {
      await ev.execute(...args);
    });
  }
});

// Log in to Discord with client token
DiscordClient.instance.login(AppConfig.instance.token).catch((error) => {
  console.error('An error occurred while the bot was trying to log in.');
  throw new Error(error);
});
