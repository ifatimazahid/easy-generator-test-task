import { Logger, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../../libs/common/src/config/database.service';
import { User, UserSchema } from '@lib/common/schemas/user.schema';
import { CustomLoggerService } from '@lib/common/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    DatabaseService,
    {
      provide: Logger,
      useFactory: () => {
        return new CustomLoggerService(process.env.LOG_FILE_PATH);
      },
    },
  ],
  exports: [UserService],
})
export class UserModule {}
