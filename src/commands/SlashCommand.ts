import { Interaction, SlashCommandBuilder } from 'discord.js';

export abstract class SlashCommand {
  abstract data: SlashCommandBuilder;
  abstract execute(interaction: Interaction): Promise<void>;
}
