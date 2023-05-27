import { Client, ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand } from '../commands/SlashCommand';
import { Commands } from '../commands/Commands';
import { DiscordEvent } from '../events/DiscordEvent';
import { Events } from '../events/Events';

export class DiscordClient extends Client {
  private static _instance: DiscordClient;
  private _commands: Collection<string, SlashCommand>;
  private _events: DiscordEvent[];

  constructor(options?: ClientOptions) {
    const clientOptions: ClientOptions = options ?? { intents: [GatewayIntentBits.Guilds] };
    super(clientOptions);
    this._commands = new Collection();
    this._events = [];
  }

  public initialize() {
    const slashCommands = new Commands();
    const discordEvents = new Events();
    const events = discordEvents.initialize();
    const commands = slashCommands.initialize();
    events.forEach((ev) => this._events.push(ev));
    commands.forEach((command) => this._commands.set(command.data.name, command));
  }

  public static start(options?: ClientOptions) {
    DiscordClient._instance = new DiscordClient(options);
  }

  public get events() {
    return DiscordClient.instance._events;
  }

  public getAllCommands(): Collection<string, SlashCommand> {
    return DiscordClient.instance._commands;
  }

  public getCommand(name: string) {
    return DiscordClient.instance._commands.get(name);
  }

  public static get instance() {
    if (!DiscordClient._instance) {
      DiscordClient._instance = new DiscordClient();
      DiscordClient.instance.initialize();
    }
    return DiscordClient._instance;
  }
}
