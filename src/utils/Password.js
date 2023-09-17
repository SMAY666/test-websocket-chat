import bcrypt from 'bcrypt';


export class Password {
    static _hashing(password) {
        return bcrypt.hashSync(password, process.env.PASSWORD_SALT);
    }

    static calculateHash(password) {
        return this._hashing(password);
    }
}
