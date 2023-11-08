import ErrorResponse from "../config/ErrorResponse"
import { User, UserEvent, UserLevel } from "../db/model"

export default class RegisterPresenceService {
    private readonly ID_LEVEL_1 = 2;
    private readonly ID_MAX_LEVEL = 5;
    public execute = async (eventId: number, userId: string) => {
        try {
            let levelId

            const user = await User.findByPk(userId);

            if (!user) {
                throw new ErrorResponse(422, "Invalid userId")
            }

            const currentUserLevel = await UserLevel.findOne({
                where: {
                    user_id: userId
                },
                order: [
                    ['id', 'DESC'],
                ]
            })

            if (!currentUserLevel) {
                levelId = await this.createFirstLevelUser(userId);
            } else {
                levelId = currentUserLevel.level_id
            }

            const numberOfUserEventsFromLevel = await UserEvent.count({
                where: {
                    user_id: userId,
                    level_id: levelId
                }
            })

            if (numberOfUserEventsFromLevel >= 14) {
                levelId = await this.createNewUserLevel(userId, levelId);
            }

            const [_userEvent, created] = await UserEvent.findOrCreate({
                where: {
                    user_id: userId,
                    event_id: eventId
                },
                defaults: {
                    user_id: userId,
                    event_id: eventId,
                    level_id: levelId
                }
            })

            if (!created) {
                throw new ErrorResponse(422, "User already registered at event !")
            }

            const userLevel = await UserLevel.findOne({
                where: {
                    level_id: levelId,
                    user_id: userId
                },
            });

            await UserLevel.update(
                {
                    user_id: userId,
                    level_id: levelId,
                    canCollectThirdPrize: userLevel!.canCollectThirdPrize ? true : numberOfUserEventsFromLevel >= 2 && !userLevel!.thirdPrizeCollected,
                    thirdPrizeCollected: userLevel!.thirdPrizeCollected ? true : false,
                    dateThirdPrizeUnlocked: !userLevel!.canCollectThirdPrize && !userLevel!.thirdPrizeCollected && numberOfUserEventsFromLevel >= 2 ? new Date() : null,
                    canCollectEighthPrize: userLevel!.canCollectEighthPrize ? true : numberOfUserEventsFromLevel >= 7 && !userLevel!.eighthPrizeCollected,
                    eighthPrizeCollected: userLevel!.eighthPrizeCollected ? true : false,
                    dateEighthPrizeUnlocked: !userLevel!.canCollectEighthPrize && !userLevel!.eighthPrizeCollected && numberOfUserEventsFromLevel >= 7 ? new Date() : null,
                    canCollectFourteenthPrize: userLevel!.canCollectFourteenthPrize ? true : numberOfUserEventsFromLevel >= 13 && !userLevel!.fourteenthPrizeCollected,
                    fourteenthPrizeCollected: userLevel!.fourteenthPrizeCollected ? true : false,
                    dateFourteenthPrizeUnlocked: !userLevel!.canCollectFourteenthPrize && !userLevel!.fourteenthPrizeCollected && numberOfUserEventsFromLevel >= 13 ? new Date() : null,
                },
                { where: { id: userLevel!.id, level_id: levelId } }
            )

        } catch (err) {
            if (err instanceof ErrorResponse) {
                throw err
            } else {
                throw new ErrorResponse(400, "Error to register user presence", err);
            }
        }
    }

    private async createFirstLevelUser(userId: string) {
        await UserLevel.create({
            user_id: userId,
            level_id: this.ID_LEVEL_1,
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

        return this.ID_LEVEL_1;
    }

    private async createNewUserLevel(userId: string, currentLevelId: number) {
        if (currentLevelId < this.ID_MAX_LEVEL) {
            const nextLevelId = currentLevelId++;
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
            return nextLevelId;
        }
        return currentLevelId;
    }
}