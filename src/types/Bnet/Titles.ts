import { type BnetApiKeyId, type BnetApiLocale, type BnetApiTypeName } from './Common';

export interface TitleIndexApiResponse {
  titles: BnetApiKeyId[];
}

export interface TitleByIdApiResponse {
  id: number;
  name: BnetApiLocale;
  gender_name: {
    male: BnetApiLocale;
    female: BnetApiLocale;
  };
  source: {
    type: BnetApiTypeName;
    achievements: BnetApiTypeName[];
  };
}
