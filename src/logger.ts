import pino from 'pino';
import { AppConfig } from './AppConfig';
export const logger = pino({
  level: AppConfig.instance.logLevel
});
