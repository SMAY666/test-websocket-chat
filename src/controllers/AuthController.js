import {authService} from '../services/AuthService.js';

class AuthController {
    async signUp(req, reply)  {
        const user = await authService.signUp(req.body);
        return reply
            .code(201)
            .send(user);
    }

    async signIn(req, reply)  {
        const token = await authService.signIn(req.body);
        return reply
            .code(200)
            .send(token);
    }
}

export const controller = new AuthController();
