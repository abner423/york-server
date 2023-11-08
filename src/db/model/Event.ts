import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
    declare id?: number;
    declare name: string;
    declare date: Date;
    declare local: string;
    declare color: string;
    declare isCanceled?: boolean;
    declare isRescheduled?: boolean;
}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isRescheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: false,
    sequelize: AppDb
})

export default Event