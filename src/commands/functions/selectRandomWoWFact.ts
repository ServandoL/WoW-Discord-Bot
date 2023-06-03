import { type EmbedBuilder } from 'discord.js';
import { BnetHttpClient } from '../../common/BnetHttpClient';
import { type AchievementsIndexApiResponse, type AchievementByIdApiResponse } from '../../types/Bnet/Achievements';
import { type BnetMediaDisplay } from '../../types/Bnet/Common';
import { type EmbedBuilderFields } from '../../types/interfaces';
import { AppConfig } from '../../AppConfig';
import { type MountByIdApiResponse, type MountDisplay, type MountIndexApiResponse } from '../../types/Bnet/Mounts';
import { type HeirloomByIdApiResponse, type HeirloomIndexApiResponse } from '../../types/Bnet/Heirlooms';
import { getRandomArrayElement } from './utils';

const baseUrl = AppConfig.instance.bnetApi;

export async function getHeirloom(embeddedResponse: EmbedBuilder): Promise<void> {
  const heirloomIndex: HeirloomIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/heirloom/index`
  );
  const randomHeirloom = getRandomArrayElement(heirloomIndex.heirlooms);
  console.info(`Calling ${randomHeirloom.key.href}`);
  const heirloomById: HeirloomByIdApiResponse = await BnetHttpClient.instance.get(randomHeirloom.key.href);
  const heirloomDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(heirloomById.media.key.href);
  const baseHeirloom = heirloomById.upgrades[0].item;
  if (typeof heirloomById.item.name === 'string') {
    embeddedResponse.setTitle(heirloomById.item.name);
  } else {
    embeddedResponse.setTitle(heirloomById.item.name?.en_US ?? '');
  }
  embeddedResponse.addFields({
    name: 'ITEM LEVEL',
    value: baseHeirloom.level.display_string?.en_US ?? 'NO DATA'
  });
  if (heirloomById.source_description?.en_US) {
    embeddedResponse.setDescription(heirloomById.source_description.en_US);
  }
  if (heirloomDisplay?.assets && heirloomDisplay.assets.length > 0) {
    embeddedResponse.setImage(heirloomDisplay.assets[0].value);
  }
  const fields: EmbedBuilderFields[] = [];
  if (heirloomById?.source?.type) {
    fields.push({
      name: 'SOURCE',
      value: heirloomById.source.type,
      inline: true
    });
  }
  if (heirloomById.upgrades?.length > 0) {
    fields.push({
      name: '# OF UPGRADES',
      value: heirloomById.upgrades.length.toString(),
      inline: true
    });
  }
  if (heirloomById.upgrades[0].item.requirements.level?.display_string) {
    fields.push({
      name: 'REQUIREMENTS',
      value: heirloomById.upgrades[0].item.requirements.level.display_string.en_US,
      inline: true
    });
  }
  if (baseHeirloom.set) {
    fields.push({
      name: 'SET',
      value: baseHeirloom.set.display_string.en_US,
      inline: true
    });
  }
  if (fields.length > 0) {
    embeddedResponse.addFields(...fields);
  }
  if (heirloomById.upgrades.length > 0) {
    fields.length = 0;
    if (baseHeirloom.stats && baseHeirloom.stats.length > 0) {
      const stats = baseHeirloom.stats.map((stat) => {
        const field: EmbedBuilderFields = {
          name: stat.type.type,
          value: stat.display.display_string.en_US,
          inline: true
        };
        return field;
      });
      fields.push(...stats);
    }
    embeddedResponse.addFields(
      {
        name: '\u200B',
        value: '\u200B'
      },
      {
        name: 'ITEM CLASS',
        value:
          typeof baseHeirloom.item_class.name !== 'string'
            ? baseHeirloom.item_class.name?.en_US ?? 'NO DATA'
            : 'NO DATA',
        inline: true
      },
      {
        name: 'ITEM SUBCLASS',
        value:
          typeof baseHeirloom.item_subclass.name !== 'string'
            ? baseHeirloom.item_subclass.name?.en_US ?? 'NO DATA'
            : 'NO DATA',
        inline: true
      },
      {
        name: 'INVENTORY TYPE',
        value:
          typeof baseHeirloom.inventory_type.name !== 'string'
            ? baseHeirloom.inventory_type.name?.en_US ?? 'NO DATA'
            : 'NO DATA',
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B'
      },
      ...fields
    );
  }
}

export async function getMount(embeddedResponse: EmbedBuilder): Promise<void> {
  const mountIndex: MountIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/mount/index`);
  const randomMount = getRandomArrayElement(mountIndex.mounts);
  console.info(`Calling ${randomMount.key.href}`);
  const mountById: MountByIdApiResponse = await BnetHttpClient.instance.get(randomMount.key.href);
  const mountDisplay: MountDisplay | undefined = mountById.creature_displays.length
    ? await BnetHttpClient.instance.get(mountById.creature_displays[0].key.href)
    : undefined;
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
}

export async function getAchievement(embeddedResponse: EmbedBuilder): Promise<void> {
  const achievementsIndex: AchievementsIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/achievement/index`
  );
  const randomAchievement = getRandomArrayElement(achievementsIndex.achievements);
  console.info(`Calling ${randomAchievement.key.href}`);
  const achievementById: AchievementByIdApiResponse = await BnetHttpClient.instance.get(randomAchievement.key.href);
  const achievementDisplay: BnetMediaDisplay | undefined = achievementById.media.key.href
    ? await BnetHttpClient.instance.get(achievementById.media.key.href)
    : undefined;
  if (typeof randomAchievement.name !== 'string' && randomAchievement.name?.en_US) {
    embeddedResponse.setTitle(randomAchievement.name.en_US);
  }
  if (achievementById?.description?.en_US) {
    embeddedResponse.setDescription(achievementById.description.en_US);
  }
  if (achievementDisplay && achievementDisplay.assets.length > 0) {
    embeddedResponse.setImage(achievementDisplay.assets[0].value);
  }
  const fields: EmbedBuilderFields[] = [];
  if (
    achievementById.category?.name &&
    typeof achievementById.category.name !== 'string' &&
    achievementById.category.name.en_US
  ) {
    fields.push({
      name: 'CATEGORY',
      value: achievementById.category.name.en_US,
      inline: true
    });
  }
  if (achievementById.points !== undefined || achievementById.points !== null) {
    fields.push({
      name: 'POINTS',
      value: achievementById.points.toString(),
      inline: true
    });
  }
  if (achievementById.next_achievement && typeof achievementById.next_achievement.name !== 'string') {
    fields.push({
      name: 'NEXT ACHIEVEMENT',
      value: achievementById.next_achievement.name?.en_US ?? 'NO DATA',
      inline: true
    });
  }
}
