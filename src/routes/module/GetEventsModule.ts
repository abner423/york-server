import { GetEventsController } from "../../controller";
import { GetEventsService } from "../../service";

export const getEventsModule = (): GetEventsController => {
    const service = new GetEventsService();
    return new GetEventsController(service);
}