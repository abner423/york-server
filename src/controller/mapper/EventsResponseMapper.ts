import { Event } from "../../db/model";
import Schedule from "../../db/model/Schedule";
import { EventsResponse } from "../response"

export class EventsResponseMapper {
    public static from(event: Event, schedule: Schedule[]): EventsResponse {
        const eventResponse = {
            id: event.id!,
            name: event.name,
            date: event.date,
            schedule: schedule,
            local: event.local,
            color: event.color
        }


        return eventResponse;
    }
}
