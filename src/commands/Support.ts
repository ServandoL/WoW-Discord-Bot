import { type ChatInputCommandInteraction, SlashCommandBuilder, type Interaction } from 'discord.js';
import { type SlashCommand } from './interface/SlashCommand';

export class Support implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply(
      'Feel free to report anything regarding the app here: https://discord.gg/yfJR4WcYWH'
    );
  }

  constructor() {
    this.data = new SlashCommandBuilder().setName('support').setDescription('Report any issues or suggestions.');
  }
}
