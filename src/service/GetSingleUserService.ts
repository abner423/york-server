import ErrorResponse from "../config/ErrorResponse";
import { User } from "../db/model"
import { AppUtils } from "../utils/AppUtils";

export default class GetSingleUserService {
    public execute = async (userId: string) => {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new ErrorResponse(404, "User not found !");
        }

        const userFormatted = await AppUtils.getUserFormatted(user);
        return userFormatted
    }
}