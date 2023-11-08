import { logger } from "../config/AppLogger"
import ErrorResponse from "../config/ErrorResponse"
import { UserLevel, UserLevelSignup } from "../db/model"
import { AppUtils } from "../utils/AppUtils"

export default class ClaimPrizeService {
    public execute = async (userId: string, isSignupLevel: boolean, prizeNumber: number, levelId: number) => {
        try {
            if (isSignupLevel) {
                logger.info("IS SIGNUP LEVEL")
                const signupPrizeAlreadyCollected = await UserLevelSignup.findOne({
                    where: {
                        user_id: userId,
                        prizeCollected: true
                    }
                })
                if (!signupPrizeAlreadyCollected) {
                    logger.info("CLAIMING SIGNUP PRIZE ...")
                    await UserLevelSignup.update(
                        {
                            canCollectPrize: false,
                            prizeCollected: true,
                            datePrizeCollected: new Date()
                        },
                        {
                            where: {
                                user_id: userId
                            }
                        }
                    )
                    await AppUtils.createNewUserLevel(userId)
                } else {
                    logger.error("SIGNUP PRIZE ALREADY COLLECTED")
                    throw new ErrorResponse(400, "Signup prize already collected")
                }
            } else {
                const userLevel = await UserLevel.findOne({
                    where: {
                        user_id: userId,
                        level_id: levelId
                    },
                })

                await this.isPrizeClaimed(prizeNumber, userLevel!)

                if (prizeNumber === 3) {

                    await UserLevel.update(
                        {
                            canCollectThirdPrize: false,
                            thirdPrizeCollected: true,
                            dateThirdPrizeCollected: new Date()
                        },
                        { where: { id: userLevel?.id, user_id: userId } }
                    )
                    await AppUtils.createNewUserLevel(userId)
                } else if (prizeNumber === 8) {
                    await UserLevel.update(
                        {
                            canCollectEighthPrize: false,
                            eighthPrizeCollected: true,
                            dateEighthPrizeCollected: new Date()
                        },
                        { where: { id: userLevel?.id, user_id: userId } }
                    )
                    await AppUtils.createNewUserLevel(userId)
                } else if (prizeNumber === 14) {
                    await UserLevel.update(
                        {
                            canCollectFourteenthPrize: false,
                            fourteenthPrizeCollected: true,
                            dateFourteenthPrizeCollected: new Date()
                        },
                        { where: { id: userLevel?.id, user_id: userId } }
                    )
                } else {
                    throw new ErrorResponse(422, "Invalid prize number")
                }
            }
        } catch (err) {
            if (err instanceof ErrorResponse) {
                throw err
            } else {
                throw new ErrorResponse(404, "User level not found");
            }
        }
    }

    private async isPrizeClaimed(prizeNumber: number, currentUserLevel: UserLevel) {
        if (prizeNumber === 3) {
            const userLevel = await UserLevel.findOne({
                where: {
                    id: currentUserLevel?.id,
                    thirdPrizeCollected: true
                }
            })
            return userLevel ? true : false;
        } else if (prizeNumber === 8) {
            const userLevel = await UserLevel.findOne({
                where: {
                    id: currentUserLevel?.id,
                    eighthPrizeCollected: true
                }
            })
            return userLevel ? true : false;
        } else if (prizeNumber === 14) {
            const userLevel = await UserLevel.findOne({
                where: {
                    id: currentUserLevel?.id,
                    fourteenthPrizeCollected: true
                }
            })
            return userLevel ? true : false;
        } else {
            throw new ErrorResponse(422, "Invalid prize number")
        }
    }
}