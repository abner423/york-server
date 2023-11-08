import { Request, Response, NextFunction } from 'express';
import { GetSingleUserService } from '../service';
import { UsersResponse } from './response';
import jwt from 'jsonwebtoken';
import { JwtRequest } from '../config/JwtRequest';


export default class GetSingleUserController {

    public constructor(private readonly service: GetSingleUserService){}

    public execute = async (req: Request, res: Response, _next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decodedUser = jwt.verify(token!, process.env.SECRET_JWT!) as JwtRequest;

        const response: UsersResponse = await this.service.execute(decodedUser.id);
        res.status(200).send({user: response});        
    }
}