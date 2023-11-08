import { Op } from "sequelize";
import { EventsResponseMapper } from "../controller/mapper";
import { EventsResponse } from "../controller/response";
import { Event } from "../db/model"
import Schedule from "../db/model/Schedule";
import { AppUtils } from "../utils/AppUtils";

export default class GetEventsService {
    public execute = async () => {
        let eventsResponse = [];

        const currentDate = new Date();

        const events = await Event.findAll({
            where: {
                date: {
                    [Op.gte]: currentDate,
                },
            },
            order: [['date', 'DESC']],
        });

        for (const event of events) {
            const schedules = await Schedule.findAll({
                where: {
                    eventId: event.id!
                }
            });

            eventsResponse.push(EventsResponseMapper.from(event, schedules));
        }

        const hashmap = this.buildHashFromEventsByDate(eventsResponse);

        return this.buildResponse(hashmap);
    }

    private buildHashFromEventsByDate(events: EventsResponse[]) {
        let hashMap = new Map<string, EventsResponse[]>();
        for (const event of events) {
            const dateKey = AppUtils.dateAbbreviationFormatter(event.date);
            const value = hashMap.get(dateKey)

            if (!value) {
                hashMap.set(dateKey, [event])
            } else {
                value.push(event)
            }
        }

        return hashMap
    }

    private buildResponse(hashMap: Map<string, EventsResponse[]>) {
        let data = [];

        for (const [key, value] of hashMap.entries()) {
            let obj = {
                date: key,
                events: value
            }

            data.push(obj);
        }

        return { data }
    }
}