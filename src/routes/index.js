import {authRouter} from './authRoutes.js';
import {Router} from 'express';

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
