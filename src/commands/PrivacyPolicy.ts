/* eslint-disable quotes */
import { type ChatInputCommandInteraction, SlashCommandBuilder, type Interaction } from 'discord.js';
import { type SlashCommand } from './interface/SlashCommand';

export class PrivacyPolicy implements SlashCommand {
  data: SlashCommandBuilder;
  async execute(interaction: Interaction): Promise<void> {
    await (interaction as ChatInputCommandInteraction).reply(
      "I do not collect your data, but because I use Blizzard's services I must include this.\nPlease visit this link if you'd like to see Blizzard's Privacy Policy: https://www.blizzard.com/en-us/legal/a4380ee5-5c8d-4e3b-83b7-ea26d01a9918/blizzard-entertainment-online-privacy-policy"
    );
  }

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('privacy-policy')
      .setDescription("I do not collect any of your data, but because I use Blizzard's services I must include this.");
  }
}
