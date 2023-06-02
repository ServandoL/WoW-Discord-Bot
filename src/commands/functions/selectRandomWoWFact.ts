import { type EmbedBuilder } from 'discord.js';
import { BnetHttpClient } from '../../common/BnetHttpClient';
import { type AchievementsIndexApiResponse, type AchievementByIdApiResponse } from '../../types/Bnet/Achievements';
import { type BnetMediaDisplay } from '../../types/Bnet/Common';
import { type EmbedBuilderFields } from '../../types/interfaces';
import { AppConfig } from '../../AppConfig';
import { type MountByIdApiResponse, type MountDisplay, type MountIndexApiResponse } from '../../types/Bnet/Mounts';

const baseUrl = AppConfig.instance.bnetApi;

export async function getMount(embeddedResponse: EmbedBuilder): Promise<void> {
  const mountIndex: MountIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/mount/index`);
  const randomMount = mountIndex.mounts[Math.floor(Math.random() * mountIndex.mounts.length)];
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
  const randomAchievement =
    achievementsIndex.achievements[Math.floor(Math.random() * achievementsIndex.achievements.length)];
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
      value: achievementById.next_achievement.name?.en_US ?? '',
      inline: true
    });
  }
}
