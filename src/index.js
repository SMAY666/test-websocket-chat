import Fastify from 'fastify';
import {sequelize} from './utils/db.js';
import {UserModel} from './models/UserModel.js';


const server = await Fastify({
    logger: console.log,
});

await sequelize.sync({alter: true, force: false});

server.listen({port: 8001}, (err, address) => {
    if (err) {
        console.log('Failed to start');
    } else {
        console.log(`Server started on ${address}`);
    }
})
