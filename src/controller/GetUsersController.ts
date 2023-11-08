import { Request, Response, NextFunction } from 'express';
import { GetUsersService } from '../service';
import { UsersResponse } from './response';

export default class GetUsersController {

    public constructor(private readonly service: GetUsersService){}

    public execute = async (_req: Request, res: Response, _next: NextFunction) => {
        const response: UsersResponse[] = await this.service.execute();

        res.status(200).send({users: response});        
    }
}