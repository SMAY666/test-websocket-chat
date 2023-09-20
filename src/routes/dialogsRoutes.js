import {Router} from 'express';
import {controller} from '../controllers/DialogsController.js';

export const dialogsRouter = new Router();
dialogsRouter.get('/', controller.getAll);
