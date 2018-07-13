const Discogs = require('disconnect').Client;

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;


if (!DISCOGS_TOKEN) {
    throw new Error('DISCOGS_TOKEN is not defined in the ENV variables');
}

const dis = new Discogs('EventbriteTest/1.2.1', {userToken: DISCOGS_TOKEN});

const db = dis.database();

console.log("Running...");

db.getRelease(176126, (err, data) => {
    const {resource_url:url} = data.images[0];

    db.getImage(url, (err, data, rateLimit) => {
        // Data contains the raw binary image data
        console.log('url', url, rateLimit);
    });
});
