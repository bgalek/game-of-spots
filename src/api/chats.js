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

    join(chatId, username) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/chats/${chatId}/join/`)
                .accept('application/json')
                .send(`{"username":"${username}"}`);
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

    ask(chatId, message, username) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/messages/private/`)
                .accept('application/json')
                .send(`{"body":"${message}","username":"${username}","chat_id":"${chatId}"}`);
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    answer(messageId, responseMessage) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/messages/${messageId}/response/`)
                .accept('application/json')
                .send(`{"body":"${responseMessage}"}`);
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    getAnswers(chatId, username) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/chats/${chatId}/private/?name=${username}`)
                .accept('application/json')
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    markAsSeen(messageId) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.post(`${API_HOST}/messages/${messageId}/as_seen/`)
                .accept('application/json')
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

    chatPrivateLog(username) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`${API_HOST}/messages/private/?username=${username}`)
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