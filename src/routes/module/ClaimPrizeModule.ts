import { ClaimPrizeController } from "../../controller";
import { ClaimPrizeService } from "../../service";

export const claimPrizeModule = (): ClaimPrizeController => {
    const service = new ClaimPrizeService();
    return new ClaimPrizeController(service);
}