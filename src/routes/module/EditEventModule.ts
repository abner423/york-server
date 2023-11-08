import { EditEventController } from "../../controller";
import { EditEventService } from "../../service";

export const editEventModule = (): EditEventController => {
    const service = new EditEventService();
    return new EditEventController(service);
}