const _ = require('lodash');

const Discogs = require('disconnect').Client;

const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN;
const PAGE_SIZE = 100;

if (!DISCOGS_TOKEN) {
    throw new Error('DISCOGS_TOKEN is not defined in the ENV variables');
}

class DiscoGS {

    constructor() {
        const dis = new Discogs('EventbriteTest/1.2.1', {userToken: DISCOGS_TOKEN});

        this._db = dis.database();
    }

    search({nextPage}) {

        return new Promise((resolve, reject) => {

            this._db.search({
                type: 'artist',
                per_page: PAGE_SIZE,
                page: nextPage,
            }).then(({pagination, results}) => {
                const artists = _.map(results, ({id, title, cover_image, thumb}) => ({
                        id,
                        name: title,
                        imageUrl: cover_image,
                        thumb: thumb,
                    }));

                resolve({
                    artists,
                    pagination,
                    isNextPage: nextPage < pagination.pages,
                });
            })
            .catch((err) => {
                reject(err);
            });

        });

    }

}

module.exports = DiscoGS;