import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from './SlashCommand';

export class Server extends SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  }
  constructor() {
    super();
    this.data = new SlashCommandBuilder().setName('server').setDescription('Provides information about the server.');
  }
}