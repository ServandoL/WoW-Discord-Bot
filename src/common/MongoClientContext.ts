import { type Collection, MongoClient, type MongoClientOptions, ObjectId } from 'mongodb';
import { AppConfig } from '../AppConfig';
import { logger } from '../logger';
import crypto from 'crypto';
import { type IEncrypted, type WebhookDocument } from '../types/interfaces';
import { EmbedBuilder, WebhookClient } from 'discord.js';
import { getRandomFact } from '../commands/functions/selectRandomWoWFact';

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

  public get webhooksColn(): Collection<WebhookDocument> {
    return MongoClientContext.instance
      .db(AppConfig.instance.lorebotDb)
      .collection<WebhookDocument>(AppConfig.instance.webhooksColn);
  }

  public async sendRandomLore(): Promise<void> {
    const cursor = MongoClientContext.instance.webhooksColn.find();
    cursor
      .stream()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .on('data', async (doc: WebhookDocument) => {
        logger.debug(`Got data: ${doc.data}`);
        const data = this.decrypt(doc.data);
        const webhookClient = new WebhookClient({
          url: data
        });
        const embed = new EmbedBuilder();
        try {
          await getRandomFact(embed);
        } catch (error) {
          logger.error(`An error occurred trying to get a random fact: ${JSON.stringify(error)}`);
          return;
        }
        try {
          await webhookClient.send({
            content: 'Daily WoW Lore',
            embeds: [embed]
          });
        } catch (error) {
          logger.error(`An error occurred trying to send the random fact: ${JSON.stringify(error)}`);
        }
      })
      .on('end', () => {
        logger.warn('Done reading from cursor.');
      })
      .on('pause', () => {
        logger.warn('Streaming is paused.');
      })
      .on('close', () => {
        logger.warn('The stream was closed.');
      })
      .on('error', (error) => {
        logger.error(`An error ocurred while streaming documents: ${JSON.stringify(error)}`);
      });
  }

  public async addWebhook(url: string): Promise<void> {
    try {
      const data = this.encrypt(url);
      const result = await MongoClientContext.instance.webhooksColn.insertOne({
        _id: new ObjectId(),
        data: data.encryptedData.concat(`,${data.iv}`),
        createdDate: new Date()
      });
      if (result.acknowledged && result.insertedId) {
        logger.info(`Successfully inserted a new webhook with _id: ${JSON.stringify(result.insertedId)}`);
      } else {
        logger.warn('I could not insert a new webhook for some reason?');
      }
    } catch (error) {
      logger.error(`An error occurred trying to encrypt the data. ${JSON.stringify(error)}`);
    }
  }

  protected encrypt(text: string): IEncrypted {
    const encoding = AppConfig.instance.crypto.encoding as crypto.Encoding;
    const iv = this.generateIV();
    const key = crypto.scryptSync(
      AppConfig.instance.crypto.password,
      AppConfig.instance.crypto.salt,
      AppConfig.instance.crypto.keyLen
    );
    const cipher = crypto.createCipheriv(AppConfig.instance.crypto.cipher, key, iv);
    let encrypted = cipher.update(text, 'utf8', encoding);
    encrypted += cipher.final(encoding);
    return {
      iv: iv.toString(encoding),
      encryptedData: encrypted
    };
  }

  protected decrypt(text: string): string {
    const encoding = AppConfig.instance.crypto.encoding as BufferEncoding;
    const input = text.split(',');
    const key = crypto.scryptSync(
      AppConfig.instance.crypto.password,
      AppConfig.instance.crypto.salt,
      AppConfig.instance.crypto.keyLen
    );
    const decipher = crypto.createDecipheriv(AppConfig.instance.crypto.cipher, key, Buffer.from(input[1], encoding));
    let decrypted = decipher.update(input[0], encoding, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  protected generateIV(): Buffer {
    return crypto.randomBytes(AppConfig.instance.crypto.bytes);
  }

  public static get instance(): MongoClientContext {
    if (!MongoClientContext._instance) {
      MongoClientContext._instance = new MongoClientContext();
    }
    return MongoClientContext._instance;
  }
}
