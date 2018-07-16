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
                            reject(err);
                        });
                    }
                });
            }).catch((err) => {
                reject(err);
            });

        }).catch((err) => {
            reject(err);
        });

    });

};

getPage(1).catch((err) => {
    console.log(err);
}).then(() => {
    mongoDB.disconnect();
});


// db.getRelease(176126, (err, data) => {
//     const {resource_url:url} = data.images[0];

//     db.getImage(url)
//         .then((err, data, rateLimit) => {
//             // Data contains the raw binary image data
//             console.log('url', url);
//             console.log('data', data);
//             console.log('rateLimit', rateLimit);
//         });
// });
