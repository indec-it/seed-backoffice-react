import Http from './http';

import {User} from '../model';

export default class UserService {
    static async fetch() {
        const {users} = await Http.get('api/users');
        return users.map(user => new User(user));
    }

    static async find(id) {
        const {user} = await Http.get(`api/users/${id}`);
        return new User(user);
    }

    static async save(user) {
        await Http.post('api/users', user);
    }
}
