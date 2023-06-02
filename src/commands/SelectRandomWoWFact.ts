import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';
import { RANDOM_CHOICES } from '../common/defaults';
import { FactChoice } from '../types/interfaces';
import { getAchievement, getMount } from './functions/selectRandomWoWFact';

export class SelectRandomWoWFact extends SlashCommand {
  data: SlashCommandBuilder;

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const target = interaction.options.getNumber('category');
    await interaction.deferReply();
    const embeddedResponse = new EmbedBuilder();
    switch (target) {
      case FactChoice.ACHIEVEMENTS:
        await getAchievement(embeddedResponse);
        break;
      case FactChoice.CREATURE:
        break;
      case FactChoice.HEIRLOOM:
        break;
      case FactChoice.ITEM:
        break;
      case FactChoice.MEDIA:
        break;
      case FactChoice.MOUNT:
        await getMount(embeddedResponse);
        break;
      case FactChoice.PET:
        break;
      case FactChoice.RACE:
        break;
      case FactChoice.SPEC:
        break;
      case FactChoice.QUEST:
        break;
      case FactChoice.SPELL:
        break;
      case FactChoice.REP:
        break;
      case FactChoice.TALENT:
        break;
      case FactChoice.TOY:
        break;
      case FactChoice.TITLE:
        break;
      case FactChoice.CLASS:
        break;
      default:
        console.warn(`${interaction.commandName}: ${target?.toString() ?? ''} is not a valid entry.`);
        await interaction.reply('Your entry is not valid. Please try again');
    }
    await interaction.editReply({ embeds: [embeddedResponse] });
  }

  constructor() {
    super();
    this.data = new SlashCommandBuilder()
      .setName('wowfact')
      .setDescription('Response with a random world of warcraft fact.');
    this.data.addNumberOption((option) =>
      option
        .setName('category')
        .setDescription('The WoW category')
        .setRequired(true)
        .addChoices(...RANDOM_CHOICES)
    );
  }
}
