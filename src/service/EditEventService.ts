import ErrorResponse from "../config/ErrorResponse";
import { EditEventRequest } from "../controller/request";
import { Event } from "../db/model";
import Schedule from "../db/model/Schedule";

export default class EditEventService {
    public execute = async (event: EditEventRequest) => {
        try {
            const eventToEdit = {
                id: event.id,
                name: event.name,
                date: event.date,
                local: event.local,
                color: event.color,
                isCanceled: event.isCanceled ?? false,
                isRescheduled: event.isRescheduled ?? false
            }

            await Event.update(
                eventToEdit,
                {
                    where: {
                        id: event.id
                    }
                }
            )

            for (const schedule of event.schedule) {
                const scheduleToEdit = {
                    eventId: eventToEdit.id,
                    ...schedule
                }
                await Schedule.update(
                    scheduleToEdit,
                    {
                        where: {
                            id: event.id,
                            scheduleEventId: scheduleToEdit.scheduleEventId
                        }
                    }
                )
            }
        } catch (error) {
            throw new ErrorResponse(400, "Error to edit event", error);
        }

    }
}