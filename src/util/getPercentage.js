import {divide, multiply, round} from 'lodash';

const getPercentage = (number, total, precision = 0) => round(divide(multiply(number, 100), total), precision);

export default getPercentage;
