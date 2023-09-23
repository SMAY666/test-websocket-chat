import {DialogModel} from '../models/DialogModel.js';
import {ERRORS} from '../constants/errors.js';
import {request} from 'express';


class DialogsRepository {
    async create(data) {
        try {
            return {
                status: 201,
                data: await DialogModel.create({
                    ...data,
                    senderId: request.userId,
                }),
            };
        } catch (err) {
            return {
                status: 500,
                data: console.log,
            };
        }
    }

    async getAll() {
        try {
            const messages = await DialogModel.findAll({
                order: [['id', 'ASC']],
            });
            if (!messages) {
                return ERRORS.DIALOGS.MESSAGES_NOT_FOUND;
            }
            return {
                status: 200,
                data: messages,
            };
        } catch (err) {
            return {
                status: 500,
                data: `Что-то пошло не так: ${err}`,
            };
        }
    }
}

export const dialogRepository = new DialogsRepository();
