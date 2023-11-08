import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class UserEvent extends Model<InferAttributes<UserEvent>, InferCreationAttributes<UserEvent>> {
    declare id?: number;
    declare user_id: string;
    declare event_id: number;
    declare level_id: number;
}

UserEvent.init({
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
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: "Events",
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
    }
  }, {
    timestamps: false,
    sequelize: AppDb
})
  
export default UserEvent