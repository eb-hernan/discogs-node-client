const MongoDB = require('./db');

const mongoDB = new MongoDB();

const mongoPromise = mongoDB.connect();

console.log('Starting the disgogs load test process...');

mongoPromise.then(() => {

    const stream = mongoDB.artists.find().stream();

    stream.on('data', (artist) => {

        console.log('artist', artist.id);

        // Pause stream
        stream.pause();

        // Restart the stream after 1 miliscecond
        setTimeout(() => {
            stream.resume();
        }, 1);
    });

    // request one image


    // update response time

    stream.on('end', () => {
        mongoDB.disconnect();
    });

}).catch((err) => {
    // stop as soon one error in mongo is found
    console.log(err);
});

// db.getImage(url)
//     .then((err, data, rateLimit) => {
//         // Data contains the raw binary image data
//         console.log('url', url);
//         console.log('data', data);
//         console.log('rateLimit', rateLimit);
//     });
