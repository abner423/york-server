import { ScheduleRequest } from "../request/CreateEventRequest";

export interface EventsResponse {
    id: number;
    name: string;
    date: Date;
    schedule: Array<ScheduleRequest>
    local: string;
    color: string;
}