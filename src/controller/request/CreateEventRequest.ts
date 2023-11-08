export interface CreateEventRequest {
    name: string;
    date: Date;
    schedule: Array<ScheduleRequest>
    local: string;
    color: string;
}

export interface ScheduleRequest {
    scheduleEventId: number;
    startTime: string;
    endTime: string;
    description: string;
}