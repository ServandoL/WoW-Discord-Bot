import { type ChatInputCommandInteraction, SlashCommandBuilder, type Interaction } from 'discord.js';
import { type SlashCommand } from './class/SlashCommand';

export class Ping implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply('Pong!');
  }

  constructor() {
    this.data = new SlashCommandBuilder().setName('ping').setDescription('Responds to a ping.');
  }
}
