import {server} from '../index.js';


export function verifyJwt(req, reply, done) {
    try {
        const accessToken = req.headers['authorization']?.split(' ')[1];
        if (!accessToken) {
            throw Error();
        }

        const decodedToken = server.jwt.verify(accessToken);
        if (!decodedToken) {
            throw Error();
        }

        req.expiresIn = decodedToken.expiresIn;
        req.userId = decodedToken.userId;

        done();
    } catch (error) {
        void reply.status(401).send({message: 'Not authorized'});
    }
}
