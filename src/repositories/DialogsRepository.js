import {DialogModel} from '../models/DialogModel.js';
import {ERRORS} from '../constants/errors.js';

class DialogsRepository {
    async create(message) {
        try {
            return await DialogModel.create({
                message: message,
            });
        } catch (err) {
            console.log(`Что-то пошло не так: ${err}`);
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
