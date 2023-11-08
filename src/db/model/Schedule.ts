import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class Schedule extends Model<InferAttributes<Schedule>, InferCreationAttributes<Schedule>> {
    declare id?: number;
    declare scheduleEventId: number
    declare eventId: number;
    declare startTime: string;
    declare endTime: string;
    declare description: string;
}

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    scheduleEventId: {
        type: DataTypes.INTEGER,
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: "Events",
                schema: "public",
            },
            key: "id",
        },
        allowNull: false
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: AppDb
})

export default Schedule