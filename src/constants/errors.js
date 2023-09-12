import {CustomError} from '../utils/errors.js';

export const ERRORS = {
    USERS: {
        USER_ALREADY_EXIST: CustomError('Пользователь с таким ником уже существует', 401),
        USER_NOT_FOUND: CustomError('Пользователь не найден', 404),
        PASSWORD_NOT_CONFIRMED: CustomError('Пароли не совпадают', 403),
        INVALID_PASSWORD: CustomError('Неверный пароль', 403)
    },
}
