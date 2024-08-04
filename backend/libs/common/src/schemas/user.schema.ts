import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from '@hapi/joi';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export const userSignupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'password',
    )
    .required()
    .messages({
      'string.pattern.name':
        'Password must contain at least 8 characters with one letter, one number, and one special character.',
      'string.empty': 'Password is required.',
    }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
