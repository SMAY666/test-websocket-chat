import {authRepository} from '../repositories/AuthRepository.js';

class AuthController {
    async signUp(req, reply)  {
        const user = await authRepository.signUp(req.body);
        return reply
            .code(201)
            .send(user);
    }

    async signIn(req, reply)  {
        const token = await authRepository.signIn(req.body);
        return reply
            .code(200)
            .send(token);
    }
}

export const controller = new AuthController();
