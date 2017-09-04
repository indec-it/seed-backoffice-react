/* global fetch FormData */
export default class Http {
    static async get(url) {
        const response = await fetch(url, {
            credentials: 'same-origin'
        });
        return response.json();
    }

    static async post(url, body) {
        const response = await fetch(url, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }

    static async put(url, body) {
        const response = await fetch(url, {
            method: 'put',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }

    static async delete(url, body) {
        const response = await fetch(url, {
            method: 'delete',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }

    static async postFile(url, file) {
        const data = new FormData();
        data.append('file', file);

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: data
        });
        return response.json();
    }
}
