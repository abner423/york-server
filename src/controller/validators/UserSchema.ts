import { ObjectSchema } from 'joi';
import { CreateUserRequest, LoginUserRequest } from '../request';
import Joi from 'joi';

const userRequestSchema: ObjectSchema<CreateUserRequest> = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    affiliation: Joi.string().required(),
})

const loginUserSchema: ObjectSchema<LoginUserRequest> = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export {
    userRequestSchema,
    loginUserSchema
};