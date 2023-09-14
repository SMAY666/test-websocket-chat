import {authService} from '../services/AuthService.js';

class AuthController {
    async signUp(request, response)  {
        const user = await authService.signUp(request.body);
        return response
            .status(201)
            .json(user);
    }

    async signIn(request, response)  {
        const token = await authService.signIn(request.body);
        return response
            .status(200)
            .json(token);
    }
}

export const controller = new AuthController();
