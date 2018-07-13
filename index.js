const _ = require('lodash');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const Discogs = require('disconnect').Client;

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;

// Connection URL
const url = 'mongodb://localhost:27017/';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true })
    .then((client) => {
        console.log('Connected successfully to server');

        mongodb = client.db('discogs');

        // Get the documents collection
        const collection = mongodb.collection('artists');

        collection.insertOne({
            id: '1',
            name: 'Foo Fighters',
            image_url: 'url'
        }).then((result) => {
                console.log('inserted!!!');
        }).catch((err) => {
            console.log('insert error');
        });

        client.close();
  })
  .catch((err) => {});

if (!DISCOGS_TOKEN) {
    throw new Error('DISCOGS_TOKEN is not defined in the ENV variables');
}

const dis = new Discogs('EventbriteTest/1.2.1', {userToken: DISCOGS_TOKEN});

const db = dis.database();

console.log("Running...");

db.search({type: 'artist'})
    .then(({pagination, results}) => {
        console.log('pagination', pagination);

        _.forEach(results, ({id, title, cover_image, thumb}) => {

            console.log({
                id,
                name: title,
                imageUrl: cover_image,
                thumb: thumb,
            });
        });
    });

db.getRelease(176126, (err, data) => {
    const {resource_url:url} = data.images[0];

    db.getImage(url)
        .then((err, data, rateLimit) => {
            // Data contains the raw binary image data
            console.log('url', url);
            console.log('data', data);
            console.log('rateLimit', rateLimit);
        });
});


