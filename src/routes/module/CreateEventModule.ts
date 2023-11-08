import { CreateEventController } from "../../controller";
import { CreateEventService } from "../../service";

export const createEventModule = (): CreateEventController => {
    const service = new CreateEventService();
    return new CreateEventController(service);
}