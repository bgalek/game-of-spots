import request from "superagent";

const API_HOST = "http://api.spots.trurl.it";

class GameOfSpotsAPI {

    withId(id) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/chats/${id}/`)
                .accept('application/json');
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    withPartialName(query) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/chats/`)
                .accept('application/json')
                .query({
                    'name': query
                });
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body.results);
            });
        });
    }

    register() {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/users/create/`)
                .accept('application/json');
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    join(chatId) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/chats/${chatId}/join/`)
                .accept('application/json');
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    sendMessage(chatId, message, username) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/chats/${chatId}/messages/`)
                .accept('application/json')
                .send(`{"body":"${message}","username":"${username}"}`);
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    chatLog(chatId) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/chats/${chatId}/messages/`)
                .accept('application/json');
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body.results);
            });
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/chats/`)
                .accept('application/json');
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body.results);
            });
        });
    }
}

export default function chats(query) {
    return new GameOfSpotsAPI(query);
}