import { type EmbedBuilder } from 'discord.js';
import { BnetHttpClient } from '../../common/BnetHttpClient';
import { type AchievementsIndexApiResponse, type AchievementByIdApiResponse } from '../../types/Bnet/Achievements';
import { type BnetMediaDisplay } from '../../types/Bnet/Common';
import { type EmbedBuilderFields } from '../../types/interfaces';
import { AppConfig } from '../../AppConfig';
import { type MountByIdApiResponse, type MountDisplay, type MountIndexApiResponse } from '../../types/Bnet/Mounts';
import { type HeirloomByIdApiResponse, type HeirloomIndexApiResponse } from '../../types/Bnet/Heirlooms';
import { getRandomArrayElement } from './utils';
import { type PetByIdApiResponse, type PetIndexApiResponse } from '../../types/Bnet/Pet';
import { type RaceByIdApiResponse, type RaceIndexApiResponse } from '../../types/Bnet/Race';
import { type SpecByIdApiResponse, type SpecIndexApiResponse } from '../../types/Bnet/Specialization';
import {
  type SingleQuestAreaApiResponse,
  type QuestAreasApiResponse,
  type QuestByIdApiResponse,
  type QuestIndexApiResponse
} from '../../types/Bnet/Quests';

const baseUrl = AppConfig.instance.bnetApi;

export async function getQuest(embeddedResponse: EmbedBuilder): Promise<void> {
  const questIndex: QuestIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/quest/index`);
  const questAreas: QuestAreasApiResponse = await BnetHttpClient.instance.get(questIndex.areas.href);
  const randomQuestArea = getRandomArrayElement(questAreas.areas);
  const singleQuestArea: SingleQuestAreaApiResponse = await BnetHttpClient.instance.get(randomQuestArea.key.href);
  const randomQuest = getRandomArrayElement(singleQuestArea.quests);
  console.info(`Calling ${randomQuest.key.href}`);
  const questById: QuestByIdApiResponse = await BnetHttpClient.instance.get(randomQuest.key.href);
  const fields: EmbedBuilderFields[] = [];
  const questAreaName =
    typeof randomQuestArea.name !== 'string' ? randomQuestArea.name?.en_US ?? 'NO DATA' : randomQuestArea.name;
  if (questById.title.en_US) {
    embeddedResponse.setTitle(`${questById.title.en_US} - ${questAreaName}`);
  } else {
    embeddedResponse.setTitle(questAreaName);
  }
  if (questById.description.en_US) {
    embeddedResponse.setDescription(
      `Requirements: Level ${questById.requirements.min_character_level} - ${questById.requirements.max_character_level}\n${questById.description.en_US}`
    );
  } else {
    embeddedResponse.setDescription(
      `Requirements: Level ${questById.requirements.min_character_level} - ${questById.requirements.max_character_level}`
    );
  }

  if (questById.rewards.reputations && questById.rewards.reputations.length > 0) {
    const reputationReward: string[] = [];
    questById.rewards.reputations.forEach((rep) => {
      const repName = typeof rep.reward.name === 'string' ? rep.reward.name : rep.reward.name?.en_US ?? 'NO DATA';
      reputationReward.push(`REP REWARD: ${repName} - ${rep.value}`);
    });
    fields.push({
      name: '\u200B',
      value: reputationReward.map((reward) => reward).join('\n')
    });
  }
  embeddedResponse.addFields(
    {
      name: 'REWARDS',
      value: `${questById.rewards.money.units.gold}g ${questById.rewards.money.units.silver}s ${questById.rewards.money.units.copper}c\n${questById.rewards.experience} EXP`
    },
    ...fields
  );
}

export async function getSpecialization(embeddedResponse: EmbedBuilder): Promise<void> {
  const specIndex: SpecIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/playable-specialization/index`
  );
  const randomSpec = getRandomArrayElement(specIndex.character_specializations);
  console.log(`Calling ${randomSpec.key.href}`);
  const specById: SpecByIdApiResponse = await BnetHttpClient.instance.get(randomSpec.key.href);
  const specDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(specById.media.key.href);
  const fields: EmbedBuilderFields[] = [];
  if (specById.name.en_US) {
    const className =
      typeof specById.playable_class.name !== 'string'
        ? specById.playable_class.name?.en_US ?? 'NO DATA'
        : specById.playable_class.name;
    embeddedResponse.setTitle(`${specById.name.en_US} ${className} - ${specById.role.type}`);
  }
  if (specById.gender_description.male) {
    embeddedResponse.setDescription(specById.gender_description.male.en_US);
  } else {
    embeddedResponse.setDescription(specById.gender_description.female.en_US);
  }
  if (specDisplay?.assets && specDisplay.assets?.length > 0) {
    embeddedResponse.setImage(specDisplay.assets[0].value);
  }
  if (specById.pvp_talents && specById.pvp_talents?.length > 0) {
    embeddedResponse.addFields({
      name: '\u200B',
      value: 'PVP TALENTS'
    });
    specById.pvp_talents.forEach((talent) => {
      const field: EmbedBuilderFields = {
        name: typeof talent.talent.name !== 'string' ? `${talent.talent.name?.en_US ?? 'NO DATA'}` : talent.talent.name,
        value: `${talent.spell_tooltip.description.en_US}`
      };
      fields.push(field);
    });
    embeddedResponse.addFields(...fields);
  }
}

export async function getPlayableRace(embeddedResponse: EmbedBuilder): Promise<void> {
  const raceIndex: RaceIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/playable-race/index`);
  const randomRace = getRandomArrayElement(raceIndex.races);
  console.log(`Calling ${randomRace.key.href}`);
  const raceById: RaceByIdApiResponse = await BnetHttpClient.instance.get(randomRace.key.href);
  if (raceById.name.en_US) {
    embeddedResponse.setTitle(raceById.name.en_US);
  }
  if (raceById.faction.type) {
    embeddedResponse.setDescription(raceById.faction.type);
  }
  const fields: EmbedBuilderFields[] = [];
  if (raceById.is_allied_race) {
    embeddedResponse.addFields({
      name: 'ALLIED RACE',
      value: '\u200B'
    });
  }
  if (raceById.playable_classes && raceById.playable_classes.length > 0) {
    embeddedResponse.addFields({
      name: '\u200B',
      value: 'CLASSES'
    });
    raceById.playable_classes.forEach((playableClass) => {
      const field: EmbedBuilderFields = {
        name: typeof playableClass.name !== 'string' ? playableClass.name?.en_US ?? 'NO DATA' : playableClass.name,
        value: '\u200B'
      };
      fields.push(field);
    });
  }
  embeddedResponse.addFields(...fields);
}

export async function getPet(embeddedResponse: EmbedBuilder): Promise<void> {
  const petIndex: PetIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/pet/index`);
  const randomPet = getRandomArrayElement(petIndex.pets);
  console.info(`Calling ${randomPet.key.href}`);
  const petById: PetByIdApiResponse = await BnetHttpClient.instance.get(randomPet.key.href);
  const petDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(petById.media.key.href);
  if (petById.name.en_US) {
    embeddedResponse.setTitle(petById.name.en_US);
  }
  if (petById.description.en_US) {
    embeddedResponse.setDescription(petById.description.en_US);
  }
  if (petDisplay?.assets && petDisplay.assets.length > 0) {
    embeddedResponse.setImage(petDisplay.assets[0].value);
  }
  const fields: EmbedBuilderFields[] = [];
  if (petById.source) {
    fields.push({
      name: 'SOURCE',
      value: petById.source.type,
      inline: true
    });
  }
  if (petById.battle_pet_type) {
    fields.push({
      name: 'TYPE',
      value: petById.battle_pet_type.type,
      inline: true
    });
  }
  if (fields.length > 0) {
    embeddedResponse.addFields(...fields);
  }
  embeddedResponse.addFields(
    {
      name: 'CAPTURABLE',
      value: petById.is_capturable ? 'YES' : 'NO',
      inline: true
    },
    {
      name: 'TRADABLE',
      value: petById.is_tradable ? 'YES' : 'NO',
      inline: true
    },
    {
      name: 'BATTLEPET',
      value: petById.is_battlepet ? 'YES' : 'NO'
    },
    {
      name: 'FACTION',
      value: petById.is_alliance_only ? 'ALLIANCE' : petById.is_horde_only ? 'HORDE' : 'NEUTRAL',
      inline: true
    }
  );
  if (petById.abilities && petById.abilities.length > 0) {
    fields.length = 0;
    embeddedResponse.addFields({
      name: '\u200B',
      value: '\u200B'
    });
    petById.abilities.forEach((ability) => {
      const field: EmbedBuilderFields = {
        name:
          typeof ability.ability.name !== 'string'
            ? ability.ability.name?.en_US ?? 'NO DATA'
            : ability.ability.name ?? 'NO DATA',
        value: `Required level: ${ability.required_level}`
      };
      fields.push(field);
    });
    embeddedResponse.addFields(...fields);
  }
}

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
