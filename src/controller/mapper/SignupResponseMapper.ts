import { Level, UserLevelSignup } from "../../db/model";
import { SignupResponse } from "../response";

export class SignupResponseMapper {
    public static from(level: Level, signupLevel: UserLevelSignup): SignupResponse {
        const response = {
            level_id: signupLevel.id!,
            name: level.name,
            canCollectPrize: signupLevel.canCollectPrize,
            prizeCollected: signupLevel.prizeCollected,
            datePrizeCollected: signupLevel.datePrizeCollected,
            datePrizeUnlocked: signupLevel.datePrizeUnlocked
        }

        return response
    }
}
