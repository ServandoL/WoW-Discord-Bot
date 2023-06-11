import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
  type Interaction,
  ActionRowBuilder,
  type ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import { type SlashCommand } from './interface/SlashCommand';

export class Unsubscribe implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply('No implemented.');
  }

  async showModal(interaction: Interaction): Promise<void> {
    const modal = new ModalBuilder().setCustomId('unsubscribe').setTitle('Unsubscribe');
    const webhookInput = new TextInputBuilder()
      .setCustomId('webhookInput')
      .setLabel('Input your webhook URL here.')
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(webhookInput);
    modal.addComponents(firstActionRow);

    await (interaction as ChatInputCommandInteraction).showModal(modal);
  }

  constructor() {
    this.data = new SlashCommandBuilder().setName('unsubscribe').setDescription('Unsubscribe from random daily lore.');
  }
}
