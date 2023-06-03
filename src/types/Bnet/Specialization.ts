import { type BnetApiKeyId, type BnetApiLocale, type BnetApiSelf, type BnetApiTypeName } from './Common';

export interface SpecIndexApiResponse {
  _links: BnetApiSelf;
  character_specializations: BnetApiKeyId[];
}

export interface SpecByIdApiResponse {
  _links: BnetApiSelf;
  playable_class: BnetApiKeyId;
  name: BnetApiLocale;
  gender_description: {
    male: BnetApiLocale;
    female: BnetApiLocale;
  };
  media: BnetApiKeyId;
  role: BnetApiTypeName;
  pvp_talents: Talents[];
}

export interface Talents {
  talent: BnetApiKeyId;
  spell_tooltip: {
    description: BnetApiLocale;
    cast_time?: BnetApiLocale;
    power_cost?: BnetApiLocale;
    cooldown?: BnetApiLocale;
    range?: BnetApiLocale;
  };
}
