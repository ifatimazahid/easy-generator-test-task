import { LoggerService, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class CustomLoggerService implements LoggerService {
  private readonly logger = new Logger(CustomLoggerService.name);
  private logFilePath: string;

  constructor(logFilePath: string) {
    this.logFilePath = logFilePath;
    if (!fs.existsSync(path.dirname(this.logFilePath))) {
      fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }
  }

  private writeLog(level: string, message: string, stack?: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message} ${
      stack ? `\n${stack}` : ''
    }\n`;

    fs.appendFileSync(this.logFilePath, logMessage);
  }

  log(message: string) {
    this.writeLog('LOG', message);
    this.logger.log(message);
  }

  error(message: string, trace: string) {
    this.writeLog('ERROR', message, trace);
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.writeLog('WARN', message);
    this.logger.warn(message);
  }

  debug(message: string) {
    this.writeLog('DEBUG', message);
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.writeLog('VERBOSE', message);
    this.logger.verbose(message);
  }
}
