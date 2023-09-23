import {UserModel} from '../models/UserModel.js';
import {ERRORS} from '../constants/errors.js';
import {Password} from '../utils/Password.js';
import jwt from 'jsonwebtoken';
import {request} from 'express';

class AuthService {

    async _generateAccessToken(userId) {
        return jwt.sign({
            userId: userId,
            liveTime: 86400000, // 24 hour
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFE_TIME,
        });
    }

    async signUp(data) {
        try {
            const candidate = await UserModel.findOne({
                where: {
                    name: data.name,
                },
            });

            if (candidate) {
                return ERRORS.USERS.USER_ALREADY_EXIST;
            }

            if (data.password !== data.confirmPassword) {
                return ERRORS.USERS.PASSWORD_NOT_CONFIRMED;
            }

            return {
                status: 201,
                message: await UserModel.create({
                    ...data,
                    passwordHash: Password.calculateHash(data.password),
                }),
            };
        } catch (error) {
            return {
                status: 500,
                data: error,
            };
        }
    }

    async signIn(data) {
        try {
            const candidate = await UserModel.findOne({
                where: {
                    name: data.name,
                },
            });
            if (!candidate) {
                return ERRORS.USERS.USER_NOT_FOUND;
            }

            if (Password.calculateHash(data.password) !== candidate.passwordHash) {
                return ERRORS.USERS.INVALID_PASSWORD;
            }

            request.userId = candidate.id;

            return {
                data: {
                    userId: candidate.id,
                    token: await this._generateAccessToken(candidate.id),
                },
                status: 200,
            };
        } catch (error) {
            return {
                status: 500,
                data: error,
            };
        }
    }
}

export const authService = new AuthService();
