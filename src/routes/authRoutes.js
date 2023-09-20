import {controller} from '../controllers/AuthController.js';
import {Router} from 'express';

export const authRouter = Router();

authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in', controller.signIn);
