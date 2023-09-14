import {CustomError} from '../utils/errors.js';

export const ERRORS = {
    USERS: {
        USER_ALREADY_EXIST: {status: 401, message: 'Пользователь с таким ником уже существует'},
        USER_NOT_FOUND: {status: 404, message: 'Пользователь не найден'},
        PASSWORD_NOT_CONFIRMED: {status: 403, message: 'Пароли не совпадают'},
        INVALID_PASSWORD: {status: 403, message: 'Неверный пароль'}
    },
}
