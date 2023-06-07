import { Events, type Interaction } from 'discord.js';
import { type DiscordClient } from '../common/DiscordClient';
import { DiscordEvent } from './class/DiscordEvent';
import { logger } from '../logger';

export class ClientInteractionCreate extends DiscordEvent {
  protected _name: string;
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const command = (interaction.client as DiscordClient).getCommand(interaction.commandName);
    if (command == null) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
      logger.info(`${this.name}: ${interaction.commandName} executed successfully.`);
    } catch (error: any) {
      const errorMsg = `${this.name}: ${interaction.commandName} - An error occurred: ${JSON.stringify({
        error: error.message
      })}`;
      logger.error(errorMsg);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true
        });
        logger.error(errorMsg);
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        });
        logger.error(errorMsg);
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
