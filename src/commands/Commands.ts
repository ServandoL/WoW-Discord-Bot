import { type SlashCommand } from './interface/SlashCommand';
import { Ping } from './Ping';
import { PrivacyPolicy } from './PrivacyPolicy';
import { SelectRandomWoWFact } from './SelectRandomWoWFact';
import { Server } from './Server';
import { Subscribe } from './Subscribe';
import { Support } from './Support';
import { Unsubscribe } from './Unsubscribe';
import { User } from './User';

export class Commands {
  private static _instance: Commands;
  public static get instance(): Commands {
    if (Commands._instance === undefined || Commands._instance === null) {
      Commands._instance = new Commands();
    }
    return Commands._instance;
  }

  public initialize(): SlashCommand[] {
    return [
      new Ping(),
      new Server(),
      new User(),
      new SelectRandomWoWFact(),
      new PrivacyPolicy(),
      new Subscribe(),
      new Unsubscribe(),
      new Support()
    ];
  }
}
