import { Events } from 'discord.js';
import { type DiscordClient } from '../common/DiscordClient';
import { DiscordEvent } from './class/DiscordEvent';
import { logger } from '../logger';

export class ClientReady extends DiscordEvent {
  protected _name: string;
  protected _once: boolean;
  async execute(client: DiscordClient): Promise<void> {
    logger.info(`Ready! Logged in as ${client.user?.tag ?? 'bloop'}`);
  }

  constructor() {
    super();
    this._name = Events.ClientReady;
    this._once = true;
  }

  public get name(): string {
    return this._name;
  }

  public get once(): boolean {
    return this._once;
  }
}
