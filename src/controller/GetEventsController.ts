import { Request, Response, NextFunction } from 'express';
import { GetEventsService } from '../service';

export default class GetEventsController {

    public constructor(private readonly service: GetEventsService) { }

    public execute = async (_req: Request, res: Response, _next: NextFunction) => {
        const response = await this.service.execute();

        res.status(200).send(response);
    }
}