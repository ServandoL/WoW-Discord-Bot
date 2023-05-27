export abstract class DiscordEvent {
  [x: string]: any;
  protected abstract _name: string;
  abstract execute(...args: any[]): Promise<void>;
  public abstract get name(): string;
}
