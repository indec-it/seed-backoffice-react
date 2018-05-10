/* global localStorage, window */
import {map} from 'lodash';
import Http from './http';
import {User} from '../model';

export default class UserService {
    static async fetch() {
        const {users} = await Http.get('api/users');
        return map(users, user => new User(user));
    }

    static async find(id) {
        const user = await Http.get(`api/users/find?id=${id}`);
        return new User(user);
    }

    static async findById(id) {
        const user = await Http.get(`api/users/findById?id=${id}`);
        return new User(user);
    }

    static async search() {
        const {users} = await Http.get('api/users/find');
        return users;
    }

    static async profile() {
        const user = await Http.get('api/users/profile');
        if (user.expiredToken) {
            localStorage.clear();
            window.location = '/signIn.html';
        }
        return new User(user);
    }

    static async save(users) {
        return Http.post('api/users', users);
    }
}
