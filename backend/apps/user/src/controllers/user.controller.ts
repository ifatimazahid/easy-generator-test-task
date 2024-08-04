import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  UserLoginRequestModel,
  UserSignupRequestModel,
} from '../../../../libs/common/src/models/user-request-model';
import { Response } from 'express';
import { JoiValidationPipe } from '@lib/common/pipes/validation.pipe';
import {
  userLoginSchema,
  userSignupSchema,
} from '../../../../libs/common/src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(userSignupSchema))
  public async signup(
    @Body() body: UserSignupRequestModel,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.signup(body);
      if (result.error === true) {
        res.status(HttpStatus.CONFLICT).send({ message: result.message });
      } else {
        res.status(HttpStatus.OK).send({ message: result.message });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(userLoginSchema))
  public async login(
    @Body() body: UserLoginRequestModel,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.login(body);
      if (result.error === true) {
        res.status(HttpStatus.UNAUTHORIZED).send({ message: result.message });
      } else {
        res.status(HttpStatus.OK).send({ message: result.message });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
