const MongoClient = require('mongodb').MongoClient;

// Connection URL
const uri = 'mongodb://localhost:27017/';

class MongoDB {

    constructor() {
        this._client = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this._client) {
                resolve();
            } else {
                MongoClient.connect(uri, { useNewUrlParser: true })
                    .then((client) => {

                        console.log('Connected successfully to server');

                        this._client = client;

                        resolve();
                    })
                    .catch((err) => {

                        console.log(`Error connecting: ${err.message}`);

                        reject(err.message);
                    });
            }
        });
    }

    disconnect() {
        this._client && this._client.close();
    }

    insertOne(artist) {
        return this.artists.insertOne(artist);
    }

    insertMany(artists) {
        return this.artists.insertMany(artists);
    }

    get artists() {
        return this._client.db('discogs').collection('artists');
    }

}

module.exports = MongoDB;