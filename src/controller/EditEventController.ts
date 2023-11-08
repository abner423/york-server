import { Request, Response, NextFunction } from 'express';
import { EditEventService } from '../service';
import BaseController from './BaseController';
import { EditEventRequest } from './request';
import { editEventRequestSchema } from './validators/EventSchema';

export default class EditEventController extends BaseController {

    public constructor(private readonly service: EditEventService){
        super();
    }

    public execute = async (req: Request, res: Response, next: NextFunction) => {
        this.validateRequest(editEventRequestSchema, req, res);
        const event: EditEventRequest = req.body;

        await this.service.execute(event);

        res.status(200).send();        
    }
}