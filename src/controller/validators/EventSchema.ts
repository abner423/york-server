import { ObjectSchema } from 'joi';
import { ClaimPrizeRequest, CreateEventRequest, EditEventRequest, RegisterPresenceRequest } from '../request';
import Joi from 'joi';

const createEventRequestSchema: ObjectSchema<CreateEventRequest> = Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.date().required(),
    schedule: Joi.array().required(),
    local: Joi.string().required(),
    color: Joi.string().required(),
})

const editEventRequestSchema: ObjectSchema<EditEventRequest> = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    date: Joi.date().required(),
    local: Joi.string().required(),
    schedule: Joi.array().required(),
    color: Joi.string().required(),
    isCanceled: Joi.boolean(),
    isRescheduled: Joi.boolean(),
})

const claimPrizeSchema: ObjectSchema<ClaimPrizeRequest> = Joi.object().keys({
    userId: Joi.string().required(),
    isSignupLevel: Joi.boolean(),
    prizeNumber: Joi.number(),
    levelId: Joi.number()
})

const registerPresenceSchema: ObjectSchema<RegisterPresenceRequest> = Joi.object().keys({
    userId: Joi.string().required(),
    eventId: Joi.number().required(),
})

export {
    createEventRequestSchema,
    editEventRequestSchema,
    claimPrizeSchema,
    registerPresenceSchema
};