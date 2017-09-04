import Http from './http';

import {Log} from '../model';

export default class UserService {
    static async fetch() {
        const {logs} = await Http.get('api/logs');
        return logs.map(log => new Log(log));
    }
}
