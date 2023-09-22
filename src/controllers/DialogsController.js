import {dialogRepository} from '../repositories/DialogsRepository.js';

class DialogsController {
    async getAll(request, response) {
        const result = await dialogRepository.getAll();

        response.status(result.status).json(result.data);
    }

    async create(request, response) {
        const result = await dialogRepository.create(request.body);

        response.status(result.status).json(result.data);
    }
}

export const controller = new DialogsController();
