import { Events, type Interaction } from 'discord.js';
import { DiscordEvent } from './class/DiscordEvent';
import { logger } from '../logger';
import { type DiscordClient } from '../common/DiscordClient';
import { MongoClientContext } from '../common/MongoClientContext';

export class ClientInteractionCreate extends DiscordEvent {
  protected _name: string;
  async execute(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      const command = (interaction.client as DiscordClient).getCommand(interaction.commandName);
      if (!command) {
        logger.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
      try {
        if (command.data.name === 'subscribe' && !!command.showModal) {
          await command.showModal(interaction);
        } else {
          await command.execute(interaction);
        }
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
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'subscribe') {
        try {
          // TODO: Logic to store encrypted webhook in mongodb
          const webhook = interaction.fields.getTextInputValue('webhookInput');
          await MongoClientContext.instance.addWebhook(webhook);
          await interaction.reply({ content: 'Thanks for subscribing!' });
        } catch (error: any) {
          const errorMsg = `${this.name}: ${interaction.customId} - An error occurred: ${JSON.stringify({
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
    } else {
      const errorMsg = `Unknown interaction type: ${interaction.type}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
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
