import { Request, Response, NextFunction } from 'express';
import { ClaimPrizeService } from '../service';
import BaseController from './BaseController';
import { claimPrizeSchema } from './validators/EventSchema';


export default class ClaimPrizeController extends BaseController {

    public constructor(private readonly service: ClaimPrizeService) {
        super();
    }

    public execute = async (req: Request, res: Response, _next: NextFunction) => {
        this.validateRequest(claimPrizeSchema, req, res);
        await this.service.execute(req.body.userId, req.body.isSignupLevel, req.body.prizeNumber, req.body.levelId);
        res.status(200).send();
    }
}