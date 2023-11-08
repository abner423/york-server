import ErrorResponse from "../config/ErrorResponse";
import { CreateEventRequest } from "../controller/request";
import { Event } from "../db/model";
import Schedule from "../db/model/Schedule";

export default class CreateEventService {
    public execute = async (event: CreateEventRequest) => {
        try {
            const eventToSave = {
                name: event.name,
                date: event.date,
                local: event.local,
                color: event.color,
            }
            const eventSaved = await Event.create(eventToSave);

            for (const schedule of event.schedule) {
                const scheduleToSave = {
                    eventId: eventSaved.id!,
                    ...schedule
                }
                await Schedule.create(scheduleToSave);
            }
        } catch (error) {
            throw new ErrorResponse(400, "Error to create event", error);
        }

    }
}