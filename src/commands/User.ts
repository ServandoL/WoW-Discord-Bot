import { type ChatInputCommandInteraction, type GuildMember, SlashCommandBuilder, type Interaction } from 'discord.js';
import { type SlashCommand } from './class/SlashCommand';

export class User implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply(
      `This command was run by ${interaction.user.username}, who joined on ${
        (interaction.member as GuildMember).joinedAt?.toString() ?? 'bloop'
      }`
    );
  }

  constructor() {
    this.data = new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.');
  }
}
