import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';
import { RANDOM_CHOICES } from '../common/defaults';
import { FactChoice } from '../types/interfaces';
import {
  getAchievement,
  getClass,
  getHeirloom,
  getItemSet,
  getMount,
  getPet,
  getPlayableRace,
  getQuest,
  getReputation,
  getSpecialization,
  getTalent,
  getTitle,
  getToy
} from './functions/selectRandomWoWFact';

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
        await interaction.editReply('Sorry, but CREATURE is not implemented yet. Go away.');
        throw new Error('Not implemented.');
      case FactChoice.HEIRLOOM:
        await getHeirloom(embeddedResponse);
        break;
      case FactChoice.ITEM_SET:
        await getItemSet(embeddedResponse);
        break;
      case FactChoice.MOUNT:
        await getMount(embeddedResponse);
        break;
      case FactChoice.PET:
        await getPet(embeddedResponse);
        break;
      case FactChoice.RACE:
        await getPlayableRace(embeddedResponse);
        break;
      case FactChoice.SPEC:
        await getSpecialization(embeddedResponse);
        break;
      case FactChoice.QUEST:
        await getQuest(embeddedResponse);
        break;
      case FactChoice.SPELL:
        // eslint-disable-next-line quotes
        await interaction.editReply("I CAN'T CAST THIS YET. Go away.");
        throw new Error('Not implemented.');
      case FactChoice.REP:
        await getReputation(embeddedResponse);
        break;
      case FactChoice.TALENT:
        await getTalent(embeddedResponse);
        break;
      case FactChoice.TOY:
        await getToy(embeddedResponse);
        break;
      case FactChoice.TITLE:
        await getTitle(embeddedResponse);
        break;
      case FactChoice.CLASS:
        await getClass(embeddedResponse);
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
      .setName('lore')
      .setDescription('Response with a random world of warcraft lore.');
    this.data.addNumberOption((option) =>
      option
        .setName('category')
        .setDescription('The WoW category')
        .setRequired(true)
        .addChoices(...RANDOM_CHOICES)
    );
  }
}
