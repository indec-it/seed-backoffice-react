import {isEmpty} from 'lodash';

export default class User {
    _id = '';
    username = '';
    name = '';
    surname = '';
    password = '';
    cPassword = '';
    phone = ''
    position = '';
    role = '';
    email = '';

    constructor(obj) {
        Object.assign(this, obj);
    }

    isValid() {
        return !isEmpty(this._id);
    }

    areValidPassword() {
        return this.password === this.cPassword;
    }

    isValidNewUser() {
        return !isEmpty(this.name)
        && !isEmpty(this.surname)
        && !isEmpty(this.email)
        && !isEmpty(this.password)
        && !isEmpty(this.phone)
        && !isEmpty(this.position)
        && !isEmpty(this.role)
        && this.password === this.cPassword;
    }
}
