/* eslint lodash/prefer-lodash-method: off */
import Http from './http';

const END_POINT = 'api/fieldMaterials/';

export default class FieldMaterialsService {
    static fieldMaterialsRequest(filters) {
        const query = Object.keys(filters).map(key =>
            `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`
        ).join('&');
        return Http.get(`${END_POINT}general?${query}`);
    }
}
