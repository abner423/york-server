export interface SignupResponse {
    level_id: number;
    name: string;
    canCollectPrize: boolean;
    prizeCollected: boolean;
    datePrizeCollected: Date | null;
    datePrizeUnlocked: Date | null;
}