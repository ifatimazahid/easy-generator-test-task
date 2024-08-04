import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../logger/logger.service';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new CustomLoggerService(process.env.LOG_FILE_PATH);

  get mongodbConnectionString(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  public async getItem(model: any, payload: any): Promise<any> {
    try {
      const item = await model.findOne(payload);
      if (item) {
        return item;
      }
    } catch (error) {
      this.logger.error('Error while fetching record from database', error);
      throw new Error(error);
    }
  }

  public async addItem(model: any, payload: any): Promise<any> {
    try {
      const saveItem = await model.create(payload);
      if (saveItem) {
        return saveItem;
      }
    } catch (error) {
      this.logger.error('Error while saving record in database', error);
      throw new Error(error);
    }
  }

  public async isExists(model: any, payload: any): Promise<any> {
    try {
      const exists = await model.exists(payload);
      if (exists) {
        return exists;
      }
    } catch (error) {
      this.logger.error('Error while checking record in database', error);
      throw new Error(error);
    }
  }
}
