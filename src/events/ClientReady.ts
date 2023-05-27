import { Events } from 'discord.js';
import { DiscordClient } from '../common/DiscordClient';
import { DiscordEvent } from './DiscordEvent';

export class ClientReady extends DiscordEvent {
  protected _name: string;
  protected _once: boolean;
  async execute(client: DiscordClient): Promise<void> {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  }
  constructor() {
    super();
    this._name = Events.ClientReady;
    this._once = true;
  }

  public get name() {
    return this._name;
  }

  public get once() {
    return this._once;
  }
}
