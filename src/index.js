import Express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'node:http';
import {sequelize} from './utils/db.js';
import {apiRouter} from './routes/index.js';
import {dialogRepository} from './repositories/DialogsRepository.js';

export const server = Express()
    .use(Express.json())
    .use(Express.urlencoded({extended: true}))
    .use('/api', apiRouter);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);

await sequelize.sync({alter: true, force: false});

server.get('/', (req, response) => {
    response.sendFile(process.cwd() + '/index.html');
});

socketServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', async (message) => {
        await dialogRepository.create(message);
    });
});


httpServer.listen(3000, () => {
    console.log('Socket server started on http://localhost:3000');
});

server.listen(8001, () => {
    console.log('Server started on port: 8001');
});
