import Http from './http';

const END_POINT = 'api/pollsters/';

export default class PollstersServices {
    static fetchPollsters({stateId}) {
        return Http.get(`${END_POINT}${stateId}`);
    }

    static fetchPollster(id) {
        return Http.get(`${END_POINT}${id}/pollster`);
    }
}
