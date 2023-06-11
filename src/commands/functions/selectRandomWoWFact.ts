import { type EmbedBuilder } from 'discord.js';
import { BnetHttpClient } from '../../common/BnetHttpClient';
import { type AchievementsIndexApiResponse, type AchievementByIdApiResponse } from '../../types/Bnet/Achievements';
import { type BnetMediaDisplay } from '../../types/Bnet/Common';
import { FactChoice, type EmbedBuilderFields } from '../../types/interfaces';
import { AppConfig } from '../../AppConfig';
import { type MountByIdApiResponse, type MountDisplay, type MountIndexApiResponse } from '../../types/Bnet/Mounts';
import { type HeirloomByIdApiResponse, type HeirloomIndexApiResponse } from '../../types/Bnet/Heirlooms';
import { getName, getRandomArrayElement, toPascalCase } from './utils';
import { type PetByIdApiResponse, type PetIndexApiResponse } from '../../types/Bnet/Pet';
import { type RaceByIdApiResponse, type RaceIndexApiResponse } from '../../types/Bnet/Race';
import { type SpecByIdApiResponse, type SpecIndexApiResponse } from '../../types/Bnet/Specialization';
import {
  type SingleQuestAreaApiResponse,
  type QuestAreasApiResponse,
  type QuestByIdApiResponse,
  type QuestIndexApiResponse
} from '../../types/Bnet/Quests';
import { type TitleByIdApiResponse, type TitleIndexApiResponse } from '../../types/Bnet/Titles';
import { type ToyByIdApiResponse, type ToyIndexApiResponse } from '../../types/Bnet/Toy';
import { type ItemByIdApiResponse } from '../../types/Bnet/Item';
import { type ClassByIdApiResponse, type ClassIndexApiResponse } from '../../types/Bnet/Classes';
import {
  type ReputationFactionByIdApiResponse,
  type ReputationFactionIndexApiResponse,
  type ReputationTierByIdApiResponse
} from '../../types/Bnet/Reputation';
import { type ItemSetApiResponse, type ItemSetByIdApiResponse } from '../../types/Bnet/ItemSet';
import { type TalentByIdApiResponse, type TalentIndexApiResponse } from '../../types/Bnet/Talents';
import { type SpellByIdApiResponse } from '../../types/Bnet/Spell';
import { logger } from '../../logger';

const baseUrl = AppConfig.instance.bnetApi;

export async function getRandomFact(embeddedResponse: EmbedBuilder): Promise<void> {
  const enumValues = Object.values(FactChoice);
  const target = getRandomArrayElement(enumValues.filter((val) => typeof val === 'number'));
  logger.info(`Calling random lore type: ${target}`);
  switch (target) {
    case FactChoice.ACHIEVEMENTS:
      await getAchievement(embeddedResponse);
      break;
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
      logger.warn(`${target} is not a valid entry.`);
  }
}

export async function getTalent(embeddedResponse: EmbedBuilder): Promise<void> {
  const talentIndex: TalentIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/talent/index`);
  const randomTalent = getRandomArrayElement(talentIndex.talents);
  logger.info(`Calling ${randomTalent.key.href}`);
  const talentById: TalentByIdApiResponse = await BnetHttpClient.instance.get(randomTalent.key.href);
  if (talentById.spell) {
    embeddedResponse.setTitle(
      `TALENT\n${getName(talentById.spell.name)} - ${getName(talentById.playable_class?.name)}`
    );
    logger.info(`Calling for spell ${talentById.spell.key.href}`);
    const spellById: SpellByIdApiResponse = await BnetHttpClient.instance.get(talentById.spell.key.href);
    const spellDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(spellById.media.key.href);
    if (spellById.description?.en_US) {
      embeddedResponse.setDescription(spellById.description?.en_US);
    }
    if (spellDisplay?.assets && spellDisplay.assets.length > 0) {
      embeddedResponse.setImage(spellDisplay.assets[0].value);
    }
  } else {
    embeddedResponse.setTitle('TALENT');
  }
  if (talentById.rank_descriptions && talentById.rank_descriptions.length > 0) {
    if (talentById.rank_descriptions.length > 1) {
      const descriptions = talentById.rank_descriptions.map((description) => {
        const desc = description.description.en_US;
        return `(${description.rank}) ${desc}`;
      });
      embeddedResponse.addFields({ name: 'RANKS', value: descriptions.join('\n') });
    }
  }
}

export async function getItemSet(embeddedResponse: EmbedBuilder): Promise<void> {
  const itemIndex: ItemSetApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/item-set/index`);
  const randomItem = getRandomArrayElement(itemIndex.item_sets);
  logger.info(`Calling ${randomItem.key.href}`);
  const itemSetById: ItemSetByIdApiResponse = await BnetHttpClient.instance.get(randomItem.key.href);
  embeddedResponse.setTitle(`ITEM SET\n${itemSetById.name.en_US}`);
  if (itemSetById.items && itemSetById.items.length > 0) {
    const items = itemSetById.items.map((item) => getName(item.name));
    embeddedResponse.addFields({
      name: 'PIECES',
      value: items.join('\n'),
      inline: true
    });
  }
  if (itemSetById.effects && itemSetById.effects.length > 0) {
    const effects = itemSetById.effects.map((effect) => {
      const name = effect.display_string.en_US;
      const count = effect.required_count.toString();
      return `${name} (${count})`;
    });
    embeddedResponse.addFields({
      name: 'EFFECTS',
      value: effects.join('\n')
    });
  }
}

export async function getReputation(embeddedResponse: EmbedBuilder): Promise<void> {
  const repIndex: ReputationFactionIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/reputation-faction/index`
  );
  const randomRep = getRandomArrayElement(repIndex.factions);
  logger.info(`Calling ${randomRep.key.href}`);
  const repFactionById: ReputationFactionByIdApiResponse = await BnetHttpClient.instance.get(randomRep.key.href);
  const repTiersById: ReputationTierByIdApiResponse = await BnetHttpClient.instance.get(
    repFactionById.reputation_tiers.key.href
  );
  if (repFactionById.player_faction) {
    embeddedResponse.setTitle(`REPUTATION\n${getName(randomRep.name)} - ${repFactionById.player_faction.type}`);
  } else {
    embeddedResponse.setTitle(`REPUTATION\n${getName(randomRep.name)}`);
  }
  if (repFactionById.description?.en_US) {
    embeddedResponse.setDescription(repFactionById.description.en_US);
  }
  if (repFactionById.factions && repFactionById.factions.length > 0) {
    const subFactions: string[] = repFactionById.factions.map((faction) => getName(faction.name));
    embeddedResponse.addFields({
      name: 'SUB FACTIONS',
      value: subFactions.join('\n')
    });
  }
  if (repTiersById.tiers && repTiersById.tiers.length > 0) {
    const tiers = repTiersById.tiers.map((tier) => tier.name.en_US);
    embeddedResponse.addFields({
      name: 'REP TIER',
      value: tiers.join('\n')
    });
  }
}

export async function getClass(embeddedResponse: EmbedBuilder): Promise<void> {
  const classIndex: ClassIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/playable-class/index`
  );
  const randomClass = getRandomArrayElement(classIndex.classes);
  logger.info(`Calling ${randomClass.key.href}`);
  const classById: ClassByIdApiResponse = await BnetHttpClient.instance.get(randomClass.key.href);
  const classMedia: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(classById.media.key.href);
  embeddedResponse.setTitle(`CLASS\n${classById.name.en_US}`);
  embeddedResponse.addFields({
    name: 'POWER TYPE',
    value:
      typeof classById.power_type.name === 'string'
        ? classById.power_type.name
        : classById.power_type.name?.en_US ?? 'NO DATA',
    inline: true
  });
  if (classMedia?.assets && classMedia.assets.length > 0) {
    embeddedResponse.setImage(classMedia.assets[0].value);
  }
  if (classById.specializations && classById.specializations.length > 0) {
    const specs = classById.specializations.map((spec) => {
      const name = getName(spec.name);
      return name;
    });
    embeddedResponse.addFields({
      name: 'SPECS',
      value: specs.join('\n')
    });
  }
  if (classById.playable_races && classById.playable_races.length > 0) {
    const races = classById.playable_races.map((race) => {
      const name = getName(race.name);
      return name;
    });
    embeddedResponse.addFields({
      name: 'RACES',
      value: races.join('\n')
    });
  }
}

export async function getToy(embeddedResponse: EmbedBuilder): Promise<void> {
  const toyIndex: ToyIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/toy/index`);
  const randomToy = getRandomArrayElement(toyIndex.toys);
  logger.info(`Calling ${randomToy.key.href}`);
  const toyById: ToyByIdApiResponse = await BnetHttpClient.instance.get(randomToy.key.href);
  const toyDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(toyById.media.key.href);
  const itemById: ItemByIdApiResponse = await BnetHttpClient.instance.get(toyById.item.key.href);
  const toyName = getName(toyById.item.name);
  embeddedResponse.setTitle(`TOY\n${toyName}`);
  if (toyById.source_description) {
    embeddedResponse.setDescription(toyById.source_description.en_US);
  }
  if (toyDisplay?.assets && toyDisplay.assets.length > 0) {
    embeddedResponse.setImage(toyDisplay.assets[0].value);
  }
  const descriptions: string[] = [];
  if (itemById.preview_item.spells && itemById.preview_item.spells.length > 0) {
    itemById.preview_item.spells.forEach((spell) => {
      descriptions.push(spell.description.en_US);
    });
  }
  embeddedResponse.addFields(
    {
      name: 'SOURCE',
      value: toyById.source.type,
      inline: true
    },
    {
      name: 'QUALITY',
      value: itemById.quality.type,
      inline: true
    }
  );
  if (descriptions.length > 0) {
    embeddedResponse.addFields({
      name: 'DESCRIPTION',
      value: descriptions.join('\n')
    });
  }
}

export async function getTitle(embeddedResponse: EmbedBuilder): Promise<void> {
  const titleIndex: TitleIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/title/index`);
  const randomTitle = getRandomArrayElement(titleIndex.titles);
  logger.info(`Calling ${randomTitle.key.href}`);
  const titleById: TitleByIdApiResponse = await BnetHttpClient.instance.get(randomTitle.key.href);
  embeddedResponse.setTitle('TITLE\n' + titleById.name.en_US);
  embeddedResponse.setDescription(
    `Male: ${titleById.gender_name.male.en_US}\nFemale: ${titleById.gender_name.female.en_US}`
  );
  embeddedResponse.addFields({
    name: 'SOURCE',
    value: titleById.source.type.type
  });
  if (titleById.source.achievements && titleById.source.achievements.length > 0) {
    const achievs = titleById.source.achievements.map((achiev) => achiev.name.en_US);
    embeddedResponse.addFields({
      name: 'ACHIEVEMENTS',
      value: achievs.join('\n')
    });
  }
}

export async function getQuest(embeddedResponse: EmbedBuilder): Promise<void> {
  const questIndex: QuestIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/quest/index`);
  const questAreas: QuestAreasApiResponse = await BnetHttpClient.instance.get(questIndex.areas.href);
  const randomQuestArea = getRandomArrayElement(questAreas.areas);
  const singleQuestArea: SingleQuestAreaApiResponse = await BnetHttpClient.instance.get(randomQuestArea.key.href);
  const randomQuest = getRandomArrayElement(singleQuestArea.quests);
  logger.info(`Calling ${randomQuest.key.href}`);
  const questById: QuestByIdApiResponse = await BnetHttpClient.instance.get(randomQuest.key.href);
  const fields: EmbedBuilderFields[] = [];
  const questAreaName = getName(randomQuestArea.name);
  if (questById.title?.en_US) {
    embeddedResponse.setTitle(`QUEST\n${questById.title.en_US} - ${questAreaName}`);
  } else {
    embeddedResponse.setTitle('QUEST\n' + questAreaName);
  }
  if (questById.description?.en_US) {
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
      const name = getName(rep.reward.name);
      reputationReward.push(`REP REWARD: ${name} - ${rep.value}`);
    });
    fields.push({
      name: '\u200B',
      value: reputationReward.map((reward) => reward).join('\n')
    });
  }
  if (questById.rewards?.money?.units) {
    embeddedResponse.addFields(
      {
        name: 'REWARDS',
        value: `${questById.rewards.money.units.gold}g ${questById.rewards.money.units.silver}s ${questById.rewards.money.units.copper}c\n${questById.rewards.experience} EXP`
      },
      ...fields
    );
  }
}

export async function getSpecialization(embeddedResponse: EmbedBuilder): Promise<void> {
  const specIndex: SpecIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/playable-specialization/index`
  );
  const randomSpec = getRandomArrayElement(specIndex.character_specializations);
  logger.info(`Calling ${randomSpec.key.href}`);
  const specById: SpecByIdApiResponse = await BnetHttpClient.instance.get(randomSpec.key.href);
  const specDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(specById.media.key.href);
  const fields: EmbedBuilderFields[] = [];
  if (specById.name.en_US) {
    const name = getName(specById.playable_class.name);
    embeddedResponse.setTitle(`SPEC\n${specById.name.en_US} ${name} - ${specById.role.type}`);
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
      const name = getName(talent.talent.name);
      const field: EmbedBuilderFields = {
        name,
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
  logger.info(`Calling ${randomRace.key.href}`);
  const raceById: RaceByIdApiResponse = await BnetHttpClient.instance.get(randomRace.key.href);
  if (raceById.name.en_US) {
    embeddedResponse.setTitle(
      'RACE\n' + raceById.name.en_US + `${raceById.faction.type ? ' - ' + toPascalCase(raceById.faction.type) : ''}`
    );
  }
  if (raceById.is_allied_race) {
    embeddedResponse.setDescription('Allied Race');
  }
  if (raceById.playable_classes && raceById.playable_classes.length > 0) {
    const classes = raceById.playable_classes.map((race) => getName(race.name));
    embeddedResponse.addFields({
      name: 'CLASSES',
      value: classes.join('\n')
    });
  }
}

export async function getPet(embeddedResponse: EmbedBuilder): Promise<void> {
  const petIndex: PetIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/pet/index`);
  const randomPet = getRandomArrayElement(petIndex.pets);
  logger.info(`Calling ${randomPet.key.href}`);
  const petById: PetByIdApiResponse = await BnetHttpClient.instance.get(randomPet.key.href);
  const petDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(petById.media.key.href);
  if (petById.name.en_US) {
    embeddedResponse.setTitle('PET\n' + petById.name.en_US + ` - ${petById.battle_pet_type?.type ?? ''}`);
  }
  if (petById.description.en_US) {
    embeddedResponse.setDescription(petById.description.en_US);
  }
  if (petDisplay?.assets && petDisplay.assets.length > 0) {
    embeddedResponse.setImage(petDisplay.assets[0].value);
  }
  const fields: EmbedBuilderFields[] = [];
  let values = '';
  if (petById.source) {
    values += `Source: ${toPascalCase(petById.source.type)}\n`;
  }
  values += `Captureable: ${petById.is_capturable ? 'Yes' : 'No'}\n`;
  values += `Tradeable: ${petById.is_capturable ? 'Yes' : 'No'}\n`;
  values += `Battle pet: ${petById.is_battlepet ? 'Yes' : 'No'}\n`;
  values += `Faction: ${petById.is_alliance_only ? 'Alliance' : petById.is_horde_only ? 'Horde' : 'Neutral'}\n`;
  embeddedResponse.addFields({
    name: 'INFO',
    value: values
  });

  if (petById.abilities && petById.abilities.length > 0) {
    const abilities = petById.abilities.map((ability) => {
      const name = getName(ability.ability.name);
      return `${name} - Required level ${ability.required_level}`;
    });
    fields.length = 0;
    embeddedResponse.addFields({
      name: 'ABILITIES',
      value: abilities.join('\n')
    });
  }
}

export async function getHeirloom(embeddedResponse: EmbedBuilder): Promise<void> {
  const heirloomIndex: HeirloomIndexApiResponse = await BnetHttpClient.instance.get(
    `${baseUrl}/data/wow/heirloom/index`
  );
  const randomHeirloom = getRandomArrayElement(heirloomIndex.heirlooms);
  logger.info(`Calling ${randomHeirloom.key.href}`);
  const heirloomById: HeirloomByIdApiResponse = await BnetHttpClient.instance.get(randomHeirloom.key.href);
  const heirloomDisplay: BnetMediaDisplay | undefined = await BnetHttpClient.instance.get(heirloomById.media.key.href);
  const baseHeirloom = heirloomById.upgrades[0].item;
  if (typeof heirloomById.item.name === 'string') {
    embeddedResponse.setTitle('HEIRLOOM\n' + heirloomById.item.name);
  } else {
    embeddedResponse.setTitle(
      `HEIRLOOM\n${getName(baseHeirloom.inventory_type.name)} - ${heirloomById.item.name?.en_US ?? ''}`
    );
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
  let value = '';
  if (heirloomById?.source?.type) {
    value += `SOURCE: ${heirloomById.source.type}\n`;
  }
  if (heirloomById.upgrades?.length > 0) {
    value += `# OF UPGRADES: ${heirloomById.upgrades.length.toString()}\n`;
  }
  if (heirloomById.upgrades[0].item.requirements.level?.display_string) {
    value += `REQUIREMENTS: ${heirloomById.upgrades[0].item.requirements.level.display_string.en_US}\n`;
  }
  if (baseHeirloom.set) {
    value += `ITEM SET: ${baseHeirloom.set.display_string.en_US}\n`;
  }
  value += `ITEM CLASS: ${getName(baseHeirloom.item_class.name)}`;
  if (value.length > 0) {
    embeddedResponse.addFields({
      name: 'INFO',
      value
    });
  }
  if (baseHeirloom.stats && baseHeirloom.stats.length > 0) {
    const stats = baseHeirloom.stats.map((stat) => stat.display.display_string.en_US);
    embeddedResponse.addFields({
      name: 'STATS',
      value: stats.join('\n')
    });
  }
}

export async function getMount(embeddedResponse: EmbedBuilder): Promise<void> {
  const mountIndex: MountIndexApiResponse = await BnetHttpClient.instance.get(`${baseUrl}/data/wow/mount/index`);
  const randomMount = getRandomArrayElement(mountIndex.mounts);
  logger.info(`Calling ${randomMount.key.href}`);
  const mountById: MountByIdApiResponse = await BnetHttpClient.instance.get(randomMount.key.href);
  const mountDisplay: MountDisplay | undefined = mountById.creature_displays.length
    ? await BnetHttpClient.instance.get(mountById.creature_displays[0].key.href)
    : undefined;
  if (randomMount.name.en_US) {
    embeddedResponse.setTitle('MOUNT\n' + randomMount.name.en_US);
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
  logger.info(`Calling ${randomAchievement.key.href}`);
  const achievementById: AchievementByIdApiResponse = await BnetHttpClient.instance.get(randomAchievement.key.href);
  const achievementDisplay: BnetMediaDisplay | undefined = achievementById.media.key.href
    ? await BnetHttpClient.instance.get(achievementById.media.key.href)
    : undefined;
  if (typeof randomAchievement.name !== 'string' && randomAchievement.name?.en_US) {
    embeddedResponse.setTitle('ACHIEVEMENT\n' + randomAchievement.name.en_US);
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
  if (achievementById.next_achievement) {
    const name = getName(achievementById.next_achievement.name);
    fields.push({
      name: 'NEXT ACHIEVEMENT',
      value: name,
      inline: true
    });
  }
  embeddedResponse.addFields(...fields);
}
