import AppConstants from "../config/AppConstants";
import ErrorResponse from "../config/ErrorResponse";
import { Level, User, UserLevelSignup } from "../db/model";
import bcrypt from "bcrypt";
import { CreateUserRequest } from "../controller/request";
import { AppUtils } from "../utils/AppUtils";

export default class RegisterUserService {
    public execute = async (user: CreateUserRequest) => {
        let userResponse: any;
        const userId = AppUtils.generateRandomId();

        await User.findOne({ where: { email: user.email } }).then(userData => {
            userResponse = userData;
        }).catch(err => { throw new ErrorResponse(503, "The server is unavailable to handle this request right now.", err) });

        if (!userResponse) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            await bcrypt
                .hash(user.password, salt)
                .then(async (passwordHashed) => {
                    user.password = passwordHashed;
                    await User.create({
                        id: userId,
                        fullName: user.fullName,
                        phone: user.phone,
                        password: user.password,
                        affiliation: user.affiliation,
                        email: user.email
                    });
                })
                .catch(_err => {
                    throw new ErrorResponse(400, "Error to save user! Try again later!")
                });

            await this.registerPrizeSignup(userId);
            await AppUtils.createNewUserLevel(userId);
        }
        else {
            throw new ErrorResponse(409, "User already registered!");
        }
    }

    private async registerPrizeSignup(userId: string) {
        const signupLevel = await Level.findOne({
            where: {
                id: 1
            }
        })

        if (!signupLevel) {
            throw new ErrorResponse(500, "Signup level doesn't exists, please contact admin !")
        }

        await UserLevelSignup.create({
            user_id: userId,
            level_id: signupLevel?.id!,
            canCollectPrize: true,
            prizeCollected: false,
            datePrizeCollected: null,
            datePrizeUnlocked: new Date(),
        })
    }
}