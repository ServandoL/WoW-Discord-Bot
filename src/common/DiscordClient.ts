import { Client, ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand } from '../commands/SlashCommand';

export class DiscordClient extends Client {
  private static _instance: DiscordClient;
  private _commands: Collection<string, SlashCommand>;

  constructor(options?: ClientOptions) {
    const clientOptions: ClientOptions = options ?? { intents: [GatewayIntentBits.Guilds] };
    super(clientOptions);
    this._commands = new Collection();
  }

  public initialize() {}

  public getCommands(): Collection<string, SlashCommand> {
    return this._commands;
  }

  public static get instance() {
    if (!DiscordClient._instance) {
      DiscordClient._instance = new DiscordClient();
    }
    return DiscordClient._instance;
  }
}
