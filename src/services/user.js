import {map} from 'lodash';
import Http from './http';
import {User} from '../model';
import StorageService from './storage';

const ENDPOINT = 'api/users';

export default class UserService {
    static async fetch(skip) {
        const {result, size, total} = await Http.get(`${ENDPOINT}?skip=${skip}`);
        return {result: map(result, user => new User(user)), size, total};
    }

    static async find(id) {
        const user = await Http.get(`${ENDPOINT}/${id}`);
        return new User(user);
    }

    static search(term) {
        return Http.get(`${ENDPOINT}/find?term=${term}`);
    }

    static validate(email, username) {
        return Http.get(`${ENDPOINT}/validate/${email}/${username}`);
    }

    static async login(username, password) {
        const {token} = await Http.login('public-api/signIn', {username, password});

        if (token) {
            await StorageService.setAuthToken(token);
            const {profile} = await UserService.session();
            return profile;
        }
        return null;
    }

    static session() {
        return Http.get(`${ENDPOINT}/session`);
    }

    static saveUser(users) {
        return Http.post(ENDPOINT, users);
    }

    static newUser(users) {
        return Http.put(ENDPOINT, users);
    }

    static deleteUser(id) {
        return Http.delete(ENDPOINT, {id});
    }
}
