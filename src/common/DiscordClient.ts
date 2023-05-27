import { Client, type ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import { type SlashCommand } from '../commands/class/SlashCommand';
import { Commands } from '../commands/Commands';
import { type DiscordEvent } from '../events/class/DiscordEvent';
import { Events } from '../events/Events';

export class DiscordClient extends Client {
  private static _instance: DiscordClient;
  private readonly _commands: Collection<string, SlashCommand>;
  private readonly _events: DiscordEvent[];

  constructor(options?: ClientOptions) {
    const clientOptions: ClientOptions = options ?? { intents: [GatewayIntentBits.Guilds] };
    super(clientOptions);
    this._commands = new Collection();
    this._events = [];
  }

  public initialize(): void {
    const slashCommands = new Commands();
    const discordEvents = new Events();
    const events = discordEvents.initialize();
    const commands = slashCommands.initialize();
    events.forEach((ev) => this._events.push(ev));
    commands.forEach((command) => this._commands.set(command.data.name, command));
  }

  public static start(options?: ClientOptions): void {
    DiscordClient._instance = new DiscordClient(options);
  }

  public get events(): DiscordEvent[] {
    return DiscordClient.instance._events;
  }

  public getAllCommands(): Collection<string, SlashCommand> {
    return DiscordClient.instance._commands;
  }

  public getCommand(name: string): SlashCommand | undefined {
    return DiscordClient.instance._commands.get(name);
  }

  public static get instance(): DiscordClient {
    if (DiscordClient._instance === undefined || DiscordClient === null) {
      DiscordClient._instance = new DiscordClient();
      DiscordClient.instance.initialize();
    }
    return DiscordClient._instance;
  }
}
