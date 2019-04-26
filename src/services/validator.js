import document from 'arg.js/src/document';
import cuit from 'arg.js/src/cuit';

import {
    size, inRange, parseInt, isDate, isEqual, isNaN
} from 'lodash';

// eslint-disable-next-line max-len
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /[0-9]+/;

export default class ValidatorService {
    static validateText(input, max = 50, min = 2) {
        return inRange(size(input), min, max + 1);
    }

    static validateNumber(input) {
        return numberRegex.test(input);
    }

    static validateDate(input) {
        if (isDate(input)) {
            return true;
        }
        return !!(new Date(input)).getTime();
    }

    static validateEmail(email) {
        return emailRegex.test(email);
    }

    static validateDocument(input) {
        return input && !isNaN(parseInt(input)) && document.isValidDni(input);
    }

    static validateCuil(cuil) {
        return cuit.isValid(cuil);
    }

    static validateCompare(input, compareInput, max = 50, min = 2) {
        return inRange(size(input), min, max) && isEqual(input, compareInput);
    }
}
