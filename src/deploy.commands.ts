import { REST, type RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { DiscordClient } from './common/DiscordClient';
import { AppConfig } from './AppConfig';

export async function deployCommands(): Promise<void> {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = DiscordClient.instance
    .getAllCommands()
    .map((command) => command.data.toJSON());
  try {
    const rest = new REST().setToken(AppConfig.instance.token);
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(Routes.applicationCommands(AppConfig.instance.clientId), {
      body: commands
    });
    console.log(`Successfully reloaded ${(data as any[]).length} application (/) commands.`);
  } catch (error) {
    const errorMsg = `An error occurred: ${JSON.stringify(error)}`;
    throw new Error(errorMsg);
  }
}
