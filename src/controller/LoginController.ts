import { Request, Response, NextFunction } from 'express';
import { LoginService } from "../service";
import BaseController from "./BaseController";
import { LoginUserRequest } from './request';
import { LoginUserResponse } from './response';
import { loginUserSchema } from './validators/UserSchema'

export default class LoginController extends BaseController {

    public constructor(private readonly service: LoginService){
        super();
    }

    public execute = async (req: Request, res: Response, next: NextFunction) => {
        this.validateRequest(loginUserSchema, req, res);
        const user: LoginUserRequest = req.body;

        const response: LoginUserResponse = await this.service.execute(user);

        res.status(200).send(response);        
    }
}