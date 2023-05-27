import { Interaction } from 'discord.js';
import { DiscordClient } from '../common/DiscordClient';

export abstract class DiscordEvent {
  [x: string]: any;
  protected abstract _name: string;
  abstract execute(...args: any[]): Promise<void>;
  public abstract get name(): string;
}
