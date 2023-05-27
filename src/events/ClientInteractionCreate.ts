import { Events, Interaction } from 'discord.js';
import { DiscordClient } from '../common/DiscordClient';
import { DiscordEvent } from './DiscordEvent';

export class ClientInteractionCreate extends DiscordEvent {
  protected _name: string;
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const command = (interaction.client as DiscordClient).getCommand(interaction.commandName);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`An error occurred: ${JSON.stringify(error)}`);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: `There was an error while executing this command!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `There was an error while executing this command!`,
          ephemeral: true,
        });
      }
    }
  }
  public get name(): string {
    return this._name;
  }
  constructor() {
    super();
    this._name = Events.InteractionCreate;
  }
}
