import {includes} from 'lodash';

const chartsColours = stateId => {
    if (includes([2, 4, 6], stateId)) {
        /**
         *  Región Buenos Aires
         */
        return {
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            hoverBackgroundColor: 'rgba(0, 0, 255, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)'
        };
    } else if (includes([10, 18, 22, 34, 38, 46, 54, 66, 86, 90], stateId)) {
        /**
         *  Región Norte
         */
        return {
            backgroundColor: 'rgba(174, 255, 0, 0.2)',
            borderColor: 'rgba(174, 255, 0, 1)',
            hoverBackgroundColor: 'rgba(221, 255, 0, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)'
        };
    } else if (includes([26, 42, 58, 62, 78, 94], stateId)) {
        /**
         *  Región Patagónica
         */
        return {
            backgroundColor: 'rgba(255, 179, 0, 0.2)',
            borderColor: 'rgba(255, 179, 0, 1)',
            hoverBackgroundColor: 'rgba(255, 94, 0, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)'
        };
    } else if (includes([50, 70, 74], stateId)) {
        /**
         *  Región Cuyo
         */
        return {
            backgroundColor: 'rgba(0, 255, 153, 0.2)',
            borderColor: 'rgba(0, 255, 153, 1)',
            hoverBackgroundColor: 'rgba(0, 255, 0, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)'
        };
    } else if (includes([14, 30, 42, 82], stateId)) {
        /**
         *  Región Centro
         */
        return {
            backgroundColor: 'rgba(255, 0, 230, 0.2)',
            borderColor: 'rgba(255, 0, 230, 1)',
            hoverBackgroundColor: 'rgba(255, 0, 98, 1)',
            hoverBorderColor: 'rgba(0, 0, 0, 1)'
        };
    }

    return null;
};

export default chartsColours;
