import {sequelize} from '../utils/db.js';
import {DataTypes} from 'sequelize';

export const DialogModel = sequelize.define('dialogs', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
