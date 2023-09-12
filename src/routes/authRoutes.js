import {controller} from '../controllers/AuthController.js';

export const authRoutes = (instance, opts, done) => {
    instance.post(
        '/sign-up',
        {},
        controller.signUp,
    );
    instance.post(
        '/sign-in',
        {},
        controller.signIn
    )
    done();
}
