import { Collection } from 'discord.js';
import { SlashCommand } from './SlashCommand';
import { Ping } from './Ping';
import { Server } from './Server';
import { User } from './User';

export class Commands {
  private static _instance: Commands;
  constructor() {}
  public static get instance() {
    if (!Commands._instance) {
      Commands._instance = new Commands();
    }
    return Commands._instance;
  }
  public initialize(): SlashCommand[] {
    return [new Ping(), new Server(), new User()];
  }
}
