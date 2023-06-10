import { REST, type RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { DiscordClient } from './common/DiscordClient';
import { AppConfig } from './AppConfig';
import { logger } from './logger';

export async function deployCommands(): Promise<void> {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = DiscordClient.instance
    .getAllCommands()
    .map((command) => command.data.toJSON());
  try {
    const rest = new REST().setToken(AppConfig.instance.token);
    logger.info(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(AppConfig.instance.clientId, AppConfig.instance.guildId),
      {
        body: commands
      }
    );
    logger.info(`Successfully reloaded ${(data as any[]).length} application (/) commands.`);
  } catch (error) {
    const errorMsg = `An error occurred: ${JSON.stringify(error)}`;
    throw new Error(errorMsg);
  }
}
