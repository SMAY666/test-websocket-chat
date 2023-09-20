import {authRouter} from './authRoutes.js';
import {Router} from 'express';
import {dialogsRouter} from './dialogsRoutes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/msg', dialogsRouter);
