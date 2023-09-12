import {Sequelize} from 'sequelize';
import 'dotenv/config.js'

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        define: {
            charset: "utf8",
            collate: 'utf8_general_ci'
        },
        host: 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 40000,
            evict: 20000,
        },
    },
);
