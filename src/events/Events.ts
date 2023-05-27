import { ClientInteractionCreate } from './ClientInteractionCreate';
import { ClientReady } from './ClientReady';
import { type DiscordEvent } from './class/DiscordEvent';

export class Events {
  private static _instance: Events;
  public static get instance(): Events {
    if (Events._instance === undefined || Events._instance === null) {
      Events._instance = new Events();
    }
    return Events._instance;
  }

  public initialize(): DiscordEvent[] {
    return [new ClientInteractionCreate(), new ClientReady()];
  }
}
