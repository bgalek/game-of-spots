import request from 'superagent';
import config from '../../../config';

class GameOfSpotsAPI {
    constructor(query) {
        this.query = query;
    }

    end() {
        return new Promise((resolve, reject) => {
            let requestInstance = request.get(`http://hostname:8080`).accept('application/json')
            requestInstance.end((error, res) => {
                if (error) reject(error);
                resolve(res.body);
            });
        });
    }
}

export default function chats(query) {
    return new GameOfSpotsAPI(query);
}