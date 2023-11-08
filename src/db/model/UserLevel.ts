import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class UserLevel extends Model<InferAttributes<UserLevel>, InferCreationAttributes<UserLevel>> {
    declare id?: number;
    declare user_id: string;
    declare level_id: number;
    declare canCollectThirdPrize: boolean;
    declare thirdPrizeCollected: boolean;
    declare dateThirdPrizeCollected: Date | null;
    declare dateThirdPrizeUnlocked: Date | null;
    declare canCollectEighthPrize: boolean;
    declare eighthPrizeCollected: boolean;
    declare dateEighthPrizeCollected: Date | null;
    declare dateEighthPrizeUnlocked: Date | null;
    declare canCollectFourteenthPrize: boolean;
    declare fourteenthPrizeCollected: boolean;
    declare dateFourteenthPrizeCollected: Date | null;
    declare dateFourteenthPrizeUnlocked: Date | null;
}

UserLevel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: {
                tableName: "Users",
                schema: "public",
            },
            key: "id",

        },
        primaryKey: true,
        allowNull: false
    },
    level_id: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: "Levels",
                schema: "public",
            },
            key: "id",

        },
        primaryKey: true,
        allowNull: false
    },
    canCollectThirdPrize: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    thirdPrizeCollected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    dateThirdPrizeCollected: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateThirdPrizeUnlocked: {
        type: DataTypes.DATE,
        allowNull: true
    },
    canCollectEighthPrize: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    eighthPrizeCollected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    dateEighthPrizeCollected: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateEighthPrizeUnlocked: {
        type: DataTypes.DATE,
        allowNull: true
    },
    canCollectFourteenthPrize: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    fourteenthPrizeCollected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    dateFourteenthPrizeCollected: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateFourteenthPrizeUnlocked: {
        type: DataTypes.DATE,
        allowNull: true
    },
  }, {
    timestamps: false,
    sequelize: AppDb
})
  
export default UserLevel