import Fastify from 'fastify';
import {sequelize} from './utils/db.js';
import {verifyJwt} from './middlewares/jwtAuth.js';
import {apiRoutes} from './routes/index.js';


export const server = await Fastify({
    logger: console.log,
});

void server.register(import('@fastify/auth'));
void server.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
});

server.decorate('verifyJwt', verifyJwt);
void server.register(apiRoutes, {prefix: '/api'});

await sequelize.sync({alter: true, force: false});

server.listen({port: 8001}, (err, address) => {
    if (err) {
        console.log(`Failed to start ${err}`);
    } else {
        console.log(`Server started on ${address}`);
    }
})
