// Require the necessary discord.js classes
import { Events, GatewayIntentBits } from 'discord.js';
import { AppConfig } from './src/AppConfig';
import { DiscordClient } from './src/common/DiscordClient';

// Create a new client instance
const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });
// initialize function to get all commands

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(AppConfig.instance.token);
