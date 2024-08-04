import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
} from '../../../../libs/common/src/schemas/user.schema';
import { DatabaseService } from '@lib/common/config/database.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CustomLoggerService } from '@lib/common/logger/logger.service';
import { UserConstants } from '../constants/constants';
import {
  UserLoginRequestModel,
  UserSignupRequestModel,
} from '@lib/common/models/user-request-model';
import { UserResponseModel } from '../../../../libs/common/src/models/user-response-model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  private readonly logger = new CustomLoggerService(process.env.LOG_FILE_PATH);
  private secretKey = this.configService.get<string>('JWT_SECRET_KEY');
  private tokenExpiry = this.configService.get<string>('JWT_TOKEN_EXPIRY');

  @Inject()
  private databaseService: DatabaseService;

  async signup(body: UserSignupRequestModel): Promise<UserResponseModel> {
    const response = new UserResponseModel();
    try {
      this.logger.log(`UserService.signup -> Signing up User`);
      const encryptPassword = await bcrypt.hash(body.password, 10);

      const isExist = await this.databaseService.isExists(this.userModel, {
        email: body.email,
      });

      if (isExist) {
        response.error = true;
        response.message = UserConstants.ALREADY_EXISTS;
        return response;
      }

      const user = await this.databaseService.addItem(this.userModel, {
        ...body,
        password: encryptPassword,
      });

      if (!user) {
        throw new Error();
      }

      const token = jwt.sign({ userId: user._id }, this.secretKey, {
        expiresIn: this.tokenExpiry,
      });

      response.error = false;
      response.token = token;
      response.message = UserConstants.SIGNUP_SUCCESS;
      return response;
    } catch (error) {
      this.logger.error(
        'UserService.signup -> Error while signing up user: ',
        error,
      );
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(body: UserLoginRequestModel): Promise<UserResponseModel> {
    const response = new UserResponseModel();

    try {
      this.logger.log(`UserService.login -> Logging in User`);
      const user = await this.databaseService.getItem(this.userModel, {
        email: body.email,
      });

      if (!user) {
        response.error = true;
        response.message = UserConstants.INVALID_CREDENTIALS;
        return response;
      }

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );

      if (!isPasswordValid) {
        response.error = true;
        response.message = UserConstants.INVALID_CREDENTIALS;
        return response;
      }

      response.error = false;
      response.message = UserConstants.LOGIN_SUCCESS;
      this.logger.log(`UserService.signup -> Log in completed`);
    } catch (error) {
      this.logger.error(
        `UserService.login -> Error while logging in User`,
        error,
      );
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response;
  }
}
