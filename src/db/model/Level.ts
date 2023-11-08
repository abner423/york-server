import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class Level extends Model<InferAttributes<Level>, InferCreationAttributes<Level>> {
    declare id?: number;
    declare name: string;
}

Level.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: false,
    sequelize: AppDb
})
  
export default Level