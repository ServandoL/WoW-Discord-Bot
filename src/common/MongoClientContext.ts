import { type Collection, MongoClient, type MongoClientOptions } from 'mongodb';
import { AppConfig } from '../AppConfig';
import { logger } from '../logger';

export class MongoClientContext extends MongoClient {
  private static _instance: MongoClientContext;

  constructor(options?: MongoClientOptions) {
    super(AppConfig.instance.mongoUrl, options);
  }

  public static async start(options?: MongoClientOptions): Promise<void> {
    MongoClientContext._instance = new MongoClientContext(options);
    try {
      MongoClientContext.instance
        .once('open', () => {
          logger.warn('Mongo connection is opened.');
        })
        .on('connectionReady', () => {
          logger.warn('Mongo connection is ready.');
        })
        .on('timeout', () => {
          logger.warn('Mongo connection timed out.');
        })
        .on('connectionClosed', () => {
          logger.warn('Mongo connection is closed.');
        })
        .on('error', (error) => {
          logger.warn(`Mongo connection error: ${JSON.stringify(error)}`);
        });
      await MongoClientContext.instance.connect();
    } catch (error) {
      logger.error(`Error connecting to mongo: ${JSON.stringify(error)}`);
    }
  }

  public get webhooksColn(): Collection {
    return MongoClientContext.instance.db(AppConfig.instance.lorebotDb).collection(AppConfig.instance.webhooksColn);
  }

  public static get instance(): MongoClientContext {
    if (!MongoClientContext._instance) {
      MongoClientContext._instance = new MongoClientContext();
    }
    return MongoClientContext._instance;
  }
}
