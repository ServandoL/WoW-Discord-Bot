import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder, type Interaction } from 'discord.js';
import { type SlashCommand } from './class/SlashCommand';
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
import { logger } from '../logger';

export class SelectRandomWoWFact implements SlashCommand {
  data: SlashCommandBuilder;

  async execute(interaction: Interaction): Promise<void> {
    const target = (interaction as ChatInputCommandInteraction).options.getNumber('category');
    await (interaction as ChatInputCommandInteraction).deferReply();
    const embeddedResponse = new EmbedBuilder();
    switch (target) {
      case FactChoice.ACHIEVEMENTS:
        await getAchievement(embeddedResponse);
        break;
      case FactChoice.CREATURE:
        await (interaction as ChatInputCommandInteraction).editReply(
          'Sorry, but CREATURE is not implemented yet. Go away.'
        );
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
        await (interaction as ChatInputCommandInteraction).editReply("I CAN'T CAST THIS YET. Go away.");
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
        logger.warn(
          `${(interaction as ChatInputCommandInteraction).commandName}: ${
            target?.toString() ?? ''
          } is not a valid entry.`
        );
        await (interaction as ChatInputCommandInteraction).editReply('Your entry is not valid. Please try again');
    }
    await (interaction as ChatInputCommandInteraction).editReply({ embeds: [embeddedResponse] });
  }

  constructor() {
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
