import { ScheduleRequest } from "./CreateEventRequest";

export interface EditEventRequest {
    id: number;
    name: string;
    date: Date;
    schedule: Array<ScheduleRequest>
    local: string;
    color: string;
    isCanceled?: boolean;
    isRescheduled?: boolean;
}  