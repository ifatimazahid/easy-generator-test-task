import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../apps/user/src/controllers/user.controller';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { UserService } from '../../../apps/user/src/services/user.service';
import {
  UserLoginRequestModel,
  UserSignupRequestModel,
} from '@lib/common/models/user-request-model';
import { UserResponseModel } from '@lib/common/models/user-response-model';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should return 200 and success message on successful signup', async () => {
    const body: UserSignupRequestModel = {
      name: 'Tester',
      email: 'test@email.com',
      password: 'Test@123',
    };
    const result = { error: false, message: 'Signup successful' };
    mockUserService.signup.mockResolvedValue(result);

    const res = mockResponse();

    await userController.signup(body, res);

    expect(mockUserService.signup).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ message: result.message });
  });

  it('should return 409 and error message on signup conflict', async () => {
    const body: UserSignupRequestModel = {
      name: 'Tester',
      email: 'test@email.com',
      password: 'Test@123',
    };
    const result = { error: true, message: 'User already exists' };
    mockUserService.signup.mockResolvedValue(result);

    const res = mockResponse();

    await userController.signup(body, res);

    expect(mockUserService.signup).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(res.send).toHaveBeenCalledWith({ message: result.message });
  });

  it('should return 500 and error message on internal server error', async () => {
    const body: UserSignupRequestModel = {
      name: 'Tester',
      email: 'test@email.com',
      password: 'Test@123',
    };
    const errorMessage = 'Internal server error';
    mockUserService.signup.mockRejectedValue(new Error(errorMessage));

    const res = mockResponse();

    await userController.signup(body, res);

    expect(mockUserService.signup).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should return 200 and success message on successful login', async () => {
    const body: UserLoginRequestModel = {
      email: 'test@example.com',
      password: 'password123',
    };
    const result: UserResponseModel = {
      error: false,
      message: 'Login successful',
    };
    mockUserService.login.mockResolvedValue(result);

    const res = mockResponse();

    await userController.login(body, res);

    expect(mockUserService.login).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ message: result.message });
  });

  it('should return 401 and error message on failed login due to invalid credentials', async () => {
    const body: UserLoginRequestModel = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };
    const result: UserResponseModel = {
      error: true,
      message: 'Invalid credentials',
    };
    mockUserService.login.mockResolvedValue(result);

    const res = mockResponse();

    await userController.login(body, res);

    expect(mockUserService.login).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(res.send).toHaveBeenCalledWith({ message: result.message });
  });

  it('should return 500 and error message on server error', async () => {
    const body: UserLoginRequestModel = {
      email: 'test@example.com',
      password: 'password123',
    };
    const errorMessage = 'Server error';
    mockUserService.login.mockRejectedValue(new Error(errorMessage));

    const res = mockResponse();

    await userController.login(body, res);

    expect(mockUserService.login).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });
});
