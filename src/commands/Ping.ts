import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';

export class Ping extends SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('Pong!');
  }

  constructor() {
    super();
    this.data = new SlashCommandBuilder().setName('ping').setDescription('Responds to a ping.');
  }
}
