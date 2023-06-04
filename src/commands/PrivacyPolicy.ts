/* eslint-disable quotes */
import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';

export class PrivacyPolicy extends SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      "I do not collect your data, but because I use Blizzard's services I must include this.\nPlease visit this link if you'd like to see Blizzard's Privacy Policy: https://www.blizzard.com/en-us/legal/a4380ee5-5c8d-4e3b-83b7-ea26d01a9918/blizzard-entertainment-online-privacy-policy"
    );
  }

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName('privacy-policy')
      .setDescription("I do not collect any of your data, but because I use Blizzard's services I must include this.");
  }
}
