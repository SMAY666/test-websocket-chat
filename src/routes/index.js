import {authRoutes} from './authRoutes.js';

export const apiRoutes = (instance, opts, done) => {
    void instance.register(authRoutes, {prefix: '/auth'});
    done();
}
