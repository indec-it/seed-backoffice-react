import Http from './http';

export default class EmailService {
    static async validate(token) {
        return Http.post('public-api/email', {token});
    }
}
