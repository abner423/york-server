import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class UserLevelSignup extends Model<InferAttributes<UserLevelSignup>, InferCreationAttributes<UserLevelSignup>> {
    declare id?: number;
    declare user_id: string;
    declare level_id: number;
    declare canCollectPrize: boolean;
    declare prizeCollected: boolean;
    declare datePrizeCollected: Date | null;
    declare datePrizeUnlocked: Date | null;
}

UserLevelSignup.init({
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
    canCollectPrize: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    prizeCollected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    datePrizeCollected: {
        type: DataTypes.DATE,
        allowNull: true
    },
    datePrizeUnlocked: {
        type: DataTypes.DATE,
        allowNull: true
    }
  }, {
    timestamps: false,
    sequelize: AppDb
})
  
export default UserLevelSignup