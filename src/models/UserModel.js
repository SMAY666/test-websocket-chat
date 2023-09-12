import {DataTypes} from 'sequelize';
import {sequelize} from '../utils/db.js';
import {password_length} from '../constants/modals.js'

export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING(password_length)
    }
})
