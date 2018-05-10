import Http from './http';
/* eslint-disable */

const randomString = () => Math.round((36 ** (9 + 1)) - (Math.random() * (36 ** 9))).toString(36).slice(1) +
(new Date().toISOString());

function getVersion() {
    return Http.get('version');
}

export {randomString};
export {getVersion};
