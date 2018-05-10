import Http from './http';

const END_POINT = 'api/assign';

export default class AssignService {
    static getRegionalAssign() {
        return Http.get(`${END_POINT}/regionalAssign`);
    }

    static saveRegionalAssign(data) {
        return Http.post(`${END_POINT}`, data);
    }

    static fetchAssignLevel(level, state) {
        return Http.get(`${END_POINT}/getLevels?level=${level}&stateId=${state}`);
    }

    static saveAssign(assign) {
        return Http.post(`${END_POINT}/dynamic`, assign);
    }
}
