import {UserModel} from '../models/UserModel.js';
import {ERRORS} from '../constants/errors.js';
import {Password} from '../utils/Password.js';
import {server} from '../index.js';

class AuthService {
    async signUp(data) {
        const candidate = await UserModel.findOne({
            where: {
                name: data.name,
            },
        });

        if (candidate) {
            throw ERRORS.USERS.USER_ALREADY_EXIST;
        }

        if (data.password !== data.confirmPassword) {
            throw ERRORS.USERS.PASSWORD_NOT_CONFIRMED;
        }

        return await UserModel.create({
            ...data,
            passwordHash: Password.calculateHash(data.password),
        });
    }

    async signIn(data) {
        const candidate = await UserModel.findOne({
            where: {
                name: data.name,
            },
        });
        if (!candidate) {
            throw ERRORS.USERS.USER_NOT_FOUND;
        }

        if (Password.calculateHash(data.password) !== candidate.passwordHash) {
            throw ERRORS.USERS.INVALID_PASSWORD;
        }
        return server.jwt.sign({
            userId: candidate.id,
            expiresIn: Date.now() + 86400000, // 24 hours
        }, {
            expiresIn: process.env.JWT_LIFE_TIME,
        });
    }
}

export const authService = new AuthService();
