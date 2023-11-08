import { Op } from "sequelize";
import AppConstants from "../config/AppConstants";
import ErrorResponse from "../config/ErrorResponse";
import { UserEventsResponseMapper, SignupResponseMapper, UsersResponseMapper } from "../controller/mapper";
import { UserLevelResponse, EventsResponse } from "../controller/response";
import { Event, Level, UserLevel, UserEvent, UserLevelSignup, User } from "../db/model";
import Schedule from "../db/model/Schedule";

export class AppUtils {
    public static dateAbbreviationFormatter(date: Date) {
        const months = [
            'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
        ];

        const formattedMonth = months[date.getMonth()];
        const formattedDay = date.getDate();

        const dayAbbreviations = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayOfWeekIndex = date.getDay();
        const dayAbbreviation = dayAbbreviations[dayOfWeekIndex];

        return `${dayAbbreviation} ${formattedDay} ${formattedMonth}`;
    }

    public static generateRandomId(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';

        for (let i = 0; i < AppConstants.NUMBER_MAX_ID; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
    }

    public static async getUserFormatted(user: User) {
        const levelsResponse: UserLevelResponse[] = [];

        const allLevels = await Level.findAll({
            where: {
                id: {
                    [Op.not]: 1
                }
            }
        });

        for (const level of allLevels) {
            const userLevel = await UserLevel.findOne({
                where: {
                    user_id: user.id,
                    level_id: level.id
                }
            })
            const eventsToMapper: EventsResponse[] = [];

            const userEvents = await UserEvent.findAll({
                where: {
                    user_id: user.id,
                    level_id: level.id
                }
            });

            for (const userEvent of userEvents) {
                const event = await Event.findOne({
                    where: {
                        id: userEvent.event_id
                    }
                })

                if (!event) {
                    throw new ErrorResponse(500, "Error to find event");
                }

                const schedule = await Schedule.findAll({
                    where: {
                        eventId: event.id
                    }
                });

                const eventResponse = {
                    id: event.id!,
                    name: event.name,
                    date: event.date,
                    schedule: schedule,
                    local: event.local,
                    color: event.color,
                }

                eventsToMapper.push(eventResponse);
            }
            levelsResponse.push(UserEventsResponseMapper.from(userLevel, level!, eventsToMapper))
        }

        const signupLevel = await Level.findOne({
            where: {
                id: 1
            }
        })

        if (!signupLevel) {
            throw new ErrorResponse(500, "Signup level doesn't exists, please contact admin !")
        }

        const userSignupLevel = await UserLevelSignup.findOne({
            where: {
                user_id: user.id
            }
        })
        const signupResponse = SignupResponseMapper.from(signupLevel, userSignupLevel!)

        return UsersResponseMapper.from(user, levelsResponse, signupResponse);
    }

    public static async createNewUserLevel(userId: string) {
        const ID_MAX_LEVEL = 5;

        const currentUserLevel = await UserLevel.findOne({
            where: {
                user_id: userId
            },
            order: [
                ['id', 'DESC'],
            ]
        })
        if (!currentUserLevel) {
            await this.createFirstLevelUser(userId);
        } else {
            const levelIsInProgress = currentUserLevel.dateThirdPrizeUnlocked === null || currentUserLevel.dateEighthPrizeUnlocked === null || currentUserLevel.dateFourteenthPrizeUnlocked === null;
            if (currentUserLevel.id! < ID_MAX_LEVEL && !levelIsInProgress) {
                const nextLevelId = currentUserLevel.id!++;
                await UserLevel.create({
                    user_id: userId,
                    level_id: nextLevelId,
                    canCollectThirdPrize: false,
                    thirdPrizeCollected: false,
                    dateThirdPrizeCollected: null,
                    dateThirdPrizeUnlocked: null,
                    canCollectEighthPrize: false,
                    eighthPrizeCollected: false,
                    dateEighthPrizeCollected: null,
                    dateEighthPrizeUnlocked: null,
                    canCollectFourteenthPrize: false,
                    fourteenthPrizeCollected: false,
                    dateFourteenthPrizeCollected: null,
                    dateFourteenthPrizeUnlocked: null,
                })
            }
        }
    }

    public static async createFirstLevelUser(userId: string) {
        const ID_LEVEL_1 = 2;

        await UserLevel.create({
            user_id: userId,
            level_id: ID_LEVEL_1,
            canCollectThirdPrize: false,
            thirdPrizeCollected: false,
            dateThirdPrizeCollected: null,
            dateThirdPrizeUnlocked: null,
            canCollectEighthPrize: false,
            eighthPrizeCollected: false,
            dateEighthPrizeCollected: null,
            dateEighthPrizeUnlocked: null,
            canCollectFourteenthPrize: false,
            fourteenthPrizeCollected: false,
            dateFourteenthPrizeCollected: null,
            dateFourteenthPrizeUnlocked: null,
        })
    }
}