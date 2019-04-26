import StorageService from './storage';

const TokenService = {
    getAuthHeader: () => `Bareer ${StorageService.getAuthToken()}`
};

export default class Http {
    static async get(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'get',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: TokenService.getAuthHeader()
            }
        });
        try {
            return response.json();
        } catch (parseError) {
            return {error: 'Ups... Algo salio mal comunicate con nuestro centro de ayuda', response};
        }
    }

    static async post(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: TokenService.getAuthHeader()
            }
        });
        try {
            return response.json();
        } catch (parseError) {
            return {error: 'Ups... Algo salio mal comunicate con nuestro centro de ayuda', response};
        }
    }

    static async put(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: TokenService.getAuthHeader()
            }
        });
        try {
            return response.json();
        } catch (parseError) {
            return {error: 'Ups... Algo salio mal comunicate con nuestro centro de ayuda', response};
        }
    }

    static async delete(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'delete',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                Authorization: TokenService.getAuthHeader()
            }
        });
        return response.json();
    }

    static async postFile(url, file) {
        const data = new FormData();
        data.append('file', file);

        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'POST',
            credentials: 'same-origin',
            body: data,
            headers: {
                'content-type': 'application/json',
                Authorization: TokenService.getAuthHeader()
            }
        });
        return response.json();
    }

    static async login(url, body) {
        const response = await fetch(`${ENDPOINT}${url}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });

        try {
            return response.json();
        } catch (parseError) {
            return {error: 'Ups... Algo salio mal comunicate con nuestro centro de ayuda', response};
        }
    }
}
