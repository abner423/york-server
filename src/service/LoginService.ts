import ErrorResponse from "../config/ErrorResponse";
import { User } from "../db/model";
import bcrypt from "bcrypt";
import { LoginUserRequest } from "../controller/request";
import jwt from 'jsonwebtoken';
import { LoginUserResponse } from "../controller/response";

export default class LoginService {
    public execute = async (userRequest: LoginUserRequest): Promise<LoginUserResponse> => {
        let userValid: boolean = false;
        let userFinded: any;
        await User.findOne({where: {email: userRequest.email }}).then(async userData => {
            userFinded = userData;
            if(userFinded){
                await bcrypt
                    .compare(userRequest.password, userFinded.password)
                    .then(res => {
                        userValid = res
                    })
                    .catch(_err => {
                        throw new ErrorResponse(400,"Error to find user! Try again later!")
                    }) 
            }
            
        }).catch(_err =>{ throw new ErrorResponse(503,"The server is unavailable to handle this request right now.") });

        if(!userValid || !userFinded){
            throw new ErrorResponse(404,"User or password invalid!");
        }

        const token = jwt.sign({ id: userFinded.id, email: userFinded.email, isAdmin: userFinded.isAdmin }, process.env.SECRET_JWT!, {
            expiresIn: '2 days',
        });

        return {fullName: userFinded.fullName, id: userFinded.id, isAdmin: userFinded.isAdmin, token}
    }
}