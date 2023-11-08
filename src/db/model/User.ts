import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import AppDb from '../AppDb'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: string;
    declare fullName: string;
    declare email: string;
    declare phone: string;
    declare password: string;
    declare affiliation: string;
    declare isAdmin?: boolean;
}

User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    affiliation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    timestamps: false,
    sequelize: AppDb
})
  
export default User