import { REST, type RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { DiscordClient } from './common/DiscordClient';
import { AppConfig } from './AppConfig';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = DiscordClient.instance
  .getAllCommands()
  .map((command) => command.data.toJSON());

const rest = new REST().setToken(AppConfig.instance.token);
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(AppConfig.instance.clientId, AppConfig.instance.guildId),
      {
        body: commands
      }
    );
    console.log(`Successfully reloaded ${(data as any[]).length} application (/) commands.`);
    process.exit(0);
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
  }
})().catch((error) => {
  console.error(`Rest call failed: ${JSON.stringify(error)}`);
  throw new Error(error);
});
