import { Event, Level, UserLevel } from "../../db/model";
import { EventDataResponse, EventsResponse, UserLevelResponse } from "../response";

export class UserEventsResponseMapper {
    public static from(userLevel: UserLevel | null, level: Level, events: EventsResponse[]): UserLevelResponse {
        if (userLevel) {
            const levelResponse = {
                level_id: level.id!,
                level_name: level.name,
                isLocked: false,
                isInProgress: userLevel.dateThirdPrizeUnlocked === null || userLevel.dateEighthPrizeUnlocked === null || userLevel.dateFourteenthPrizeUnlocked === null,
                isClaimed: userLevel.thirdPrizeCollected && userLevel.eighthPrizeCollected && userLevel.fourteenthPrizeCollected,
                canClaim: userLevel.canCollectThirdPrize || userLevel.canCollectEighthPrize || userLevel.canCollectFourteenthPrize,
                canCollectThirdPrize: userLevel.canCollectThirdPrize,
                thirdPrizeCollected: userLevel.thirdPrizeCollected,
                dateThirdPrizeCollected: userLevel.dateThirdPrizeCollected,
                dateThirdPrizeUnlocked: userLevel.dateThirdPrizeUnlocked,
                canCollectEighthPrize: userLevel.canCollectEighthPrize,
                eighthPrizeCollected: userLevel.eighthPrizeCollected,
                dateEighthPrizeCollected: userLevel.dateEighthPrizeCollected,
                dateEighthPrizeUnlocked: userLevel.dateEighthPrizeUnlocked,
                canCollectFourteenthPrize: userLevel.canCollectFourteenthPrize,
                fourteenthPrizeCollected: userLevel.fourteenthPrizeCollected,
                dateFourteenthPrizeCollected: userLevel.dateFourteenthPrizeCollected,
                dateFourteenthPrizeUnlocked: userLevel.dateFourteenthPrizeUnlocked
            }

            return { ...levelResponse, events }
        } else {
            const levelResponse = {
                level_id: level.id!,
                level_name: level.name,
                isLocked: true,
                isInProgress: false,
                isClaimed: false,
                canClaim: false,
                canCollectThirdPrize: false,
                thirdPrizeCollected: false,
                dateThirdPrizeCollected: null,
                dateThirdPrizeUnlocked: null,
                canCollectEighthPrize: false,
                eighthPrizeCollected: false,
                dateEighthPrizeCollected: null,
                dateEighthPrizeUnlocked: null,
                canCollectFourteenthPrize: false,
                fourteenthPrizeCollected: false,
                dateFourteenthPrizeCollected: null,
                dateFourteenthPrizeUnlocked: null
            }

            return { ...levelResponse, events }
        }
    }
}
