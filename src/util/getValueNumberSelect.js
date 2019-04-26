import {find, toNumber} from 'lodash';

const getValueNumberSelect = (value, options) => (
    find(options, o => o.value === (value === '' ? '' : toNumber(value)))
);

export default getValueNumberSelect;
