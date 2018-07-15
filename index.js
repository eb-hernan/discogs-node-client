const MongoDB = require('./db');
const DiscoGS = require('./discogs');

const mongoDB = new MongoDB();

const mongoPromise = mongoDB.connect();

const discoGS = new DiscoGS();

console.log('Starting the disgogs import process...');

const getPage = (nextPage) => {

    discoGS.search({nextPage}).then(({
        artists,
        pagination,
        isNextPage,
    }) => {
        console.log('pagination', pagination);
        console.log('isNextPage', isNextPage);

        mongoPromise.then(() => {
            mongoDB.insertMany(artists).then((result) => {
                console.log(`inserted ${result.insertedCount}`);
                mongoDB.disconnect();
            }).catch((err) => {
                mongoDB.disconnect();
            });
        });

    });
};

getPage(1);


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
