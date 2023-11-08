import { Request, Response, NextFunction } from 'express';
import BaseController from './BaseController';
import { registerPresenceSchema } from './validators/EventSchema'
import { RegisterPresenceService } from '../service';

export default class RegisterPresenceController extends BaseController {

    public constructor(private readonly service: RegisterPresenceService) {
        super();
    }

    public execute = async (req: Request, res: Response, next: NextFunction) => {
        this.validateRequest(registerPresenceSchema, req, res);

        await this.service.execute(req.body.eventId, req.body.userId);

        res.status(201).send({ message: "Presence registered!" });
    }
}