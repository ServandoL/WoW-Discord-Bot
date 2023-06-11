import { Events, type Interaction } from 'discord.js';
import { DiscordEvent } from './class/DiscordEvent';
import { logger } from '../logger';
import { type DiscordClient } from '../common/DiscordClient';
import { MongoClientContext } from '../common/MongoClientContext';
import { AddWebhookResponse, DeleteResponse } from '../types/interfaces';

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
        if ((command.data.name === 'subscribe' || command.data.name === 'unsubscribe') && !!command.showModal) {
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
      if (interaction.customId === 'unsubscribe') {
        try {
          const webhook = interaction.fields.getTextInputValue('webhookInput');
          const result = await MongoClientContext.instance.deleteWebhook(webhook);
          if (result === DeleteResponse.ERROR) {
            await interaction.reply({
              content: 'There was an error while handling this request. Please try again or contact support.',
              ephemeral: true
            });
          } else if (result === DeleteResponse.NOT_FOUND) {
            await interaction.reply({
              content: 'I could not find this webhook. Please try again or contact support.',
              ephemeral: true
            });
          } else {
            await interaction.reply({
              content: 'Successfully deleted this webhook. You will no longer recieve messages from me. See you later!'
            });
          }
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
      if (interaction.customId === 'subscribe') {
        try {
          const webhook = interaction.fields.getTextInputValue('webhookInput');
          const result = await MongoClientContext.instance.addWebhook(webhook, interaction.guild?.name);
          if (result === AddWebhookResponse.BAD_URL) {
            await interaction.reply({ content: 'You sent me a bad url. I cannot process this request.' });
          } else if (result === AddWebhookResponse.ERROR) {
            await interaction.reply({ content: 'Something weird happened... I cannot process this request.' });
          } else {
            await interaction.reply({
              content:
                'I got your webhook! I will send you one random WoW Lore per day. You can unsubscribe at any time with /unsubscribe. Thanks for subscribing!'
            });
          }
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
