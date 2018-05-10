import {keys} from 'lodash';

import Http from './http';

const END_POINT = 'api/review/';

export default class ReviewService {
    static getStates() {
        return Http.get(`${END_POINT}states`);
    }

    static getStateInfo(stateId) {
        return Http.get(`${END_POINT}stateInfo?stateId=${stateId}`);
    }

    static fetchSurveys(params, skip) {
        const query = keys(params).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        ).join('&');

        return Http.get(`${END_POINT}surveys?${query}&skip=${skip}`);
    }

    static fetchSurvey(id, stateId) {
        return Http.get(`${END_POINT}survey/${id}/${stateId}/surveyDetails`);
    }

    static requestReassignSurvey(id, pollster) {
        return Http.post(`${END_POINT}reassign`, {id, pollster});
    }

    static requestApproveSurvey(id) {
        return Http.post(`${END_POINT}approve`, {id});
    }

    static requestReopenSurvey(id) {
        return Http.post(`${END_POINT}reopen`, {id});
    }
}
