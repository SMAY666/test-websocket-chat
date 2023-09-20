import {authService} from '../services/AuthService.js';
import {CustomError} from '../utils/errors.js';

class AuthController {
    async signUp(request, response) {
        const result = await authService.signUp(request.body);
        return response
            .status(result.status)
            .json(result.data);

    }

    async signIn(request, response) {
        const token = await authService.signIn(request.body);
        return response
            .status(200)
            .json(token);
    }
}

export const controller = new AuthController();
