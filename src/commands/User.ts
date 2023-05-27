import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from './SlashCommand';

export class User extends SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${
        (interaction.member as GuildMember).joinedAt
      }`
    );
  }
  constructor() {
    super();
    this.data = new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.');
  }
}
