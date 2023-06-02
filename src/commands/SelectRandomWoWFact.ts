import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommand } from './class/SlashCommand';
import { RANDOM_CHOICES } from '../common/defaults';
import { type EmbedBuilderFields, FactChoice } from '../types/interfaces';
import { BnetHttpClient } from '../common/BnetHttpClient';
import { AppConfig } from '../AppConfig';
import { type MountDisplay, type MountByIdApiResponse, type MountIndexApiResponse } from '../types/Mounts';

export class SelectRandomWoWFact extends SlashCommand {
  data: SlashCommandBuilder;

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const target = interaction.options.getNumber('category');
    const baseUrl = AppConfig.instance.bnetApi;
    await interaction.deferReply();
    switch (target) {
      case FactChoice.ACHIEVEMENTS:
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
        {
          const mountIndex: MountIndexApiResponse = await BnetHttpClient.instance.get(
            `${baseUrl}/data/wow/mount/index`
          );
          const randomMount = mountIndex.mounts[Math.floor(Math.random() * mountIndex.mounts.length)];
          console.info(`Calling ${randomMount.key.href}`);
          const mountById: MountByIdApiResponse = await BnetHttpClient.instance.get(randomMount.key.href);
          const mountDisplay: MountDisplay | undefined = mountById.creature_displays.length
            ? await BnetHttpClient.instance.get(mountById.creature_displays[0].key.href)
            : undefined;
          const embeddedResponse = new EmbedBuilder();
          if (randomMount.name.en_US) {
            embeddedResponse.setTitle(randomMount.name.en_US);
          }
          if (mountById.description.en_US) {
            embeddedResponse.setDescription(mountById.description.en_US);
          }
          if (mountDisplay?.assets && mountDisplay.assets.length > 0) {
            embeddedResponse.setImage(mountDisplay.assets[0].value);
          }
          const fields: EmbedBuilderFields[] = [];
          if (!!mountById?.source?.type) {
            fields.push({
              name: 'SOURCE',
              value: mountById.source.type,
              inline: true
            });
          }
          if (!!mountById?.faction?.type) {
            fields.push({
              name: 'FACTION',
              value: mountById.faction.type,
              inline: true
            });
          }
          if (!!mountById?.requirements?.faction?.type) {
            fields.push({
              name: 'REQUIREMENTS',
              value: mountById.requirements.faction.type,
              inline: true
            });
          }
          if (fields.length > 0) {
            embeddedResponse.addFields(...fields);
          }
          await interaction.editReply({ embeds: [embeddedResponse] });
        }
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
