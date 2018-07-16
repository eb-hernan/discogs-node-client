const sleep = require('sleep');

const MongoDB = require('./db');
const DiscoGS = require('./discogs');

const discoGS = new DiscoGS();
const mongoDB = new MongoDB();
const mongoPromise = mongoDB.connect();

const parseHrtimeToSeconds = (hrtime) => {
    return (hrtime[0] + (hrtime[1] / 1e9)).toFixed(2);
}

let totalCount = 0;
let successCount = 0;
let errorCount = 0;
let successElapsedSeconds = 0;
let errorElapsedSeconds = 0;

console.log('Starting the disgogs load test process...');

mongoPromise.then(() => {

    const stream = mongoDB.artists.find().stream();

    stream.on('data', (artist) => {
        const {imageUrl} = artist;

        if (imageUrl) {
            const startTime = process.hrtime();

            discoGS.getImage(imageUrl).then((err, data, rateLimit) => {
                const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));

                console.log(`[SUCCESS] ${imageUrl} took ${elapsedSeconds} seconds`);

                successCount++;
                successElapsedSeconds += Number(elapsedSeconds);

                stream.resume();
            }).catch(() => {
                const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));

                console.log(`[ERROR] ${imageUrl} took ${elapsedSeconds} seconds`);

                errorCount++;
                errorElapsedSeconds += Number(elapsedSeconds);

                stream.resume();
            });

            totalCount++;

            stream.pause();
        }

    });

    stream.on('end', () => {

        sleep.sleep(10);

        console.log(`Total Requests: ${totalCount}`);

        console.log(`Success Requests: ${successCount}`);
        console.log(`Success Rate: ${successCount/totalCount}`);
        console.log(`Average Success Elapsed Time: ${successElapsedSeconds/successCount} seconds`);

        console.log(`Error Requests: ${errorCount}`);
        console.log(`Error Rate: ${errorCount/totalCount}`);
        console.log(`Average Error Elapsed Time: ${errorElapsedSeconds/errorCount} seconds`);
        mongoDB.disconnect();
    });

}).catch((err) => {
    // stop as soon one error in mongo is found
    console.log(err);
});
