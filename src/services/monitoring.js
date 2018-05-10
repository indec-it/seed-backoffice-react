/* eslint lodash/prefer-lodash-method: off */
import Http from './http';

const END_POINT = 'api/monitoring/';

export default class MonitoringService {
    static fetchGeneralMonitoring() {
        return Http.get(`${END_POINT}general`);
    }

    static fetchResponseMonitoring(filters) {
        const query = Object.keys(filters).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
        ).join('&');
        return Http.get(`${END_POINT}response?${query}`);
    }
}
