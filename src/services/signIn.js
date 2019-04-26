const authEndpoint = process.env.AUTH_ENDPOINT;

export default class SignIn {
    static async login(username, password) {
        const response = await fetch(`${authEndpoint}oauth/login`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({username, password}),
            headers: {
                'content-type': 'application/json'
            }
        });
        return response.json();
    }
}
