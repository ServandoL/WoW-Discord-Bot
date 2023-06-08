import { SlashCommandBuilder, type ChatInputCommandInteraction, type Interaction } from 'discord.js';
import { type SlashCommand } from './class/SlashCommand';

export class Unsubscribe implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply('You are now unsubscribed from daily random lore.');
  }

  constructor() {
    this.data = new SlashCommandBuilder().setName('unsubscribe').setDescription('Unsubscribe from random daily lore.');
  }
}
