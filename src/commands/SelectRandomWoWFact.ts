import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';
import { RANDOM_CHOICES } from '../common/defaults';

export class SelectRandomWoWFact extends SlashCommand {
  data: SlashCommandBuilder;

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName('Random WoW Fact')
      .setDescription('Response with a random world of warcraft fact.');
    this.data.addNumberOption((option) =>
      option
        .setName('Category')
        .setDescription('The WoW category')
        .setRequired(true)
        .addChoices(...RANDOM_CHOICES)
    );
  }
}
