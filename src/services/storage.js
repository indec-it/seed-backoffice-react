/* global localStorage */
import User from '../model/user';

export default class StorageService {
    static setAuthToken(token) {
        localStorage.setItem('id_token', token);
    }

    static setProfile(user) {
        localStorage.setItem('profile', JSON.stringify(user));
    }

    static getProfile() {
        const user = JSON.parse(localStorage.getItem('profile'));
        return new User(user);
    }

    static getAuthToken() {
        return localStorage.getItem('id_token');
    }
}
