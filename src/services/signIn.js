import Http from './http';

export default class SignIn {
    static async login(username, password) {
        return Http.post('public-api/signIn', {username, password});
    }
}
