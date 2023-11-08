import { User } from "../../db/model";
import { SignupResponse, UserLevelResponse, UsersResponse } from "../response";

export class UsersResponseMapper {
    public static from(user: User, levels: UserLevelResponse[], signup: SignupResponse): UsersResponse {
        const userResponse = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            affiliation: user.affiliation,
            levels: levels,
            signupLevel: signup
        }

        return userResponse
    }
}
