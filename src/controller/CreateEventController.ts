import { Request, Response, NextFunction } from 'express';
import { CreateEventService } from '../service';
import BaseController from './BaseController';
import { CreateEventRequest } from './request';
import { createEventRequestSchema } from './validators/EventSchema';

export default class CreateEventController extends BaseController {

    public constructor(private readonly service: CreateEventService) {
        super();
    }

    public execute = async (req: Request, res: Response, next: NextFunction) => {
        this.validateRequest(createEventRequestSchema, req, res);
        const event: CreateEventRequest = req.body;

        await this.service.execute(event);

        res.status(201).send();
    }
}