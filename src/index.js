import Express from 'express';
import {Server} from 'socket.io'
import {sequelize} from './utils/db.js';
import {createServer} from 'node:http';


export const server = await Express();
const httpServer= createServer(server);
const socketServer = new Server(httpServer)

await sequelize.sync({alter: true, force: false});

server.get('/', (req, response) => {
    response.sendFile(process.cwd() + '/index.html');
})

socketServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', (socket) => {
        console.log('a user disconnected');
    })
});


httpServer.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
