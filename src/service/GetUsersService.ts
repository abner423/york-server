import { UsersResponse } from "../controller/response";
import { User } from "../db/model"
import { AppUtils } from "../utils/AppUtils";

export default class GetUsersService {
    public execute = async () => {
        const response: UsersResponse[] = [];

        const users = await User.findAll({
            where: {
                isAdmin: false
            }
        });

        for (const user of users) {
            const userFormatted = await AppUtils.getUserFormatted(user);
            response.push(userFormatted);
        }

        return response;
    }
}