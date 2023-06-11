import { type Interaction, type SlashCommandBuilder } from 'discord.js';

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: Interaction) => Promise<void>;
  showModal?: (interaction: Interaction) => Promise<void>;
}
