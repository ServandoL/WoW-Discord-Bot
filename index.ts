// Require the necessary discord.js classes
import { GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';

// Create a new client instance
DiscordClient.instance.start({ intents: [GatewayIntentBits.Guilds] });
// initialize function to get all commands
DiscordClient.instance.initialize();

DiscordClient.instance.events.forEach((ev) => {
  if (ev.once) {
    DiscordClient.instance.once(ev.name, (...args) => ev.execute(...args));
  } else {
    DiscordClient.instance.on(ev.name, (...args) => ev.execute(...args));
  }
});

// Log in to Discord with your client's token
DiscordClient.instance.login(AppConfig.instance.token);
