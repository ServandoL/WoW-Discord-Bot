import { type BnetApiLocale } from '../../types/Bnet/Common';

export function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getName(name: string | BnetApiLocale | undefined): string {
  return typeof name === 'string' ? name : name?.en_US ?? 'NO DATA';
}
