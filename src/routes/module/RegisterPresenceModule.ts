import { RegisterPresenceController } from "../../controller";
import { RegisterPresenceService } from "../../service";

export const registerPresenceModule = (): RegisterPresenceController => {
    const service = new RegisterPresenceService();
    return new RegisterPresenceController(service);
}