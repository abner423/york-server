import { EventsResponse } from ".";

export interface UserLevelResponse {
    level_id: number;
    level_name: string;
    isLocked: boolean;
    isInProgress: boolean;
    isClaimed: boolean;
    canClaim: boolean;
    canCollectThirdPrize: boolean;
    thirdPrizeCollected: boolean;
    dateThirdPrizeCollected: Date | null;
    dateThirdPrizeUnlocked: Date | null;
    canCollectEighthPrize: boolean;
    eighthPrizeCollected: boolean;
    dateEighthPrizeCollected: Date | null;
    dateEighthPrizeUnlocked: Date | null;
    canCollectFourteenthPrize: boolean;
    fourteenthPrizeCollected: boolean;
    dateFourteenthPrizeCollected: Date | null;
    dateFourteenthPrizeUnlocked: Date | null;
    events: EventsResponse[];
}