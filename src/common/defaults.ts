import { type APIApplicationCommandOptionChoice } from 'discord.js';
import { FactChoice } from '../interfaces/interfaces';

export const RANDOM_CHOICES: Array<APIApplicationCommandOptionChoice<number>> = [
  {
    name: 'Achievements',
    value: FactChoice.ACHIEVEMENTS
  },
  {
    name: 'Creatures',
    value: FactChoice.CREATURE
  },
  {
    name: 'Heirlooms',
    value: FactChoice.HEIRLOOM
  },
  {
    name: 'Items',
    value: FactChoice.ITEM
  },
  {
    name: 'Media',
    value: FactChoice.MEDIA
  },
  {
    name: 'Mounts',
    value: FactChoice.MOUNT
  },
  {
    name: 'Pets',
    value: FactChoice.PET
  },
  {
    name: 'Playable Race',
    value: FactChoice.RACE
  },
  {
    name: 'Playable Class',
    value: FactChoice.CLASS
  },
  {
    name: 'Spec',
    value: FactChoice.SPEC
  },
  {
    name: 'Quest',
    value: FactChoice.QUEST
  },
  {
    name: 'Spells',
    value: FactChoice.SPELL
  },
  {
    name: 'Reputation',
    value: FactChoice.REP
  },
  {
    name: 'Talents',
    value: FactChoice.TALENT
  },
  {
    name: 'Toys',
    value: FactChoice.TOY
  },
  {
    name: 'Titles',
    value: FactChoice.TITLE
  }
];
