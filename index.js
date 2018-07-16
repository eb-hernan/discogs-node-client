const MongoDB = require('./db');
const DiscoGS = require('./discogs');

const mongoDB = new MongoDB();

const mongoPromise = mongoDB.connect();

const discoGS = new DiscoGS();

console.log('Starting the disgogs import process...');

const getPage = (nextPage) => {

    return new Promise((resolve, reject) => {

        mongoPromise.then(() => {

            discoGS.search({nextPage}).then(({artists,pagination}) => {
                mongoDB.insertMany(artists).then((result) => {
                    console.log(`inserted ${result.insertedCount}`);
                    // api page limit of 100!
                    if (nextPage >= pagination.pages) {
                        resolve();
                    } else {
                        getPage(nextPage + 1).then(() => {
                            resolve();
                        }).catch((err) => {
                            // stop as soon one error in mongo is found
                            reject(err);
                        });
                    }
                });
            }).catch((err) => {
                // stop as soon one error in discogs api is found
                reject(err);
            });

        }).catch((err) => {
            // stop as soon one error in mongo is found
            reject(err);
        });

    });

};

getPage(1).catch((err) => {
    console.log(err);
}).then(() => {
    mongoDB.disconnect();
});
