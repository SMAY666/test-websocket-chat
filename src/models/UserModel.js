import {DataTypes} from 'sequelize';
import {sequelize} from '../utils/db.js';


export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'user_model_name',
    },
    passwordHash: {
        type: DataTypes.STRING,
    },
});
