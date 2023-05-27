// Require the necessary discord.js classes
import { GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';

// Create a new client instance
DiscordClient.start({ intents: [GatewayIntentBits.Guilds] });
// initialize function to get all commands
DiscordClient.instance.initialize();

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

// Log in to Discord with your client's token
DiscordClient.instance.login(AppConfig.instance.token).catch((error) => {
  console.error('An error occurred while the bot was trying to log in.');
  throw new Error(error);
});
