import { ClientInteractionCreate } from './ClientInteractionCreate';
import { ClientReady } from './ClientReady';
import { DiscordEvent } from './DiscordEvent';

export class Events {
  private static _instance: Events;
  public static get instance() {
    if (!Events._instance) {
      Events._instance = new Events();
    }
    return Events._instance;
  }
  public initialize(): DiscordEvent[] {
    return [new ClientInteractionCreate(), new ClientReady()];
  }
}
