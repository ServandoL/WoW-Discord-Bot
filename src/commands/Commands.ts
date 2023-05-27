import { type SlashCommand } from './SlashCommand';
import { Ping } from './Ping';
import { Server } from './Server';
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
    return [new Ping(), new Server(), new User()];
  }
}
