import request from "superagent";

class GameOfSpotsAPI {
    constructor() {
    }

    withId(id) {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get("http://api.spots.trurl.it/chats/" + id + "/").accept('application/json')
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get("http://api.spots.trurl.it/chats/").accept('application/json')
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