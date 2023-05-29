import { SlashCommandBuilder, type ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';

export class RandomWoWFact extends SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    throw new Error('Method not implemented.');
  }

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName('Random WoW Fact')
      .setDescription('Response with a random world of warcraft fact.');
  }
}
