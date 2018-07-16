# discogs-node-client
DiscoGS API client for node JS

## Installation Instructions

Clone this repository and `cd` into it in a terminal window.

1. Install [`nvm`](https://gist.github.com/d2s/372b5943bce17b964a79)

2. Install `nvm install v9.8.0`

3. Check node version `node -v`

4. `npm install`

## Database

1. Install MongoDB `brew install mongodb@3.4`

2. Create the directory where the data will be stored `mkdir -p data/db`

3. Run mongoDB deamon `npm run-script mongo`

4. Install [`Robo3T`](https://robomongo.org/)

5. Connect to http://localhost:27017

## Node

1. Create an account https://www.discogs.com and create a token

2. Add the token in the env variables to be used in the node app `export DISCOGS_TOKEN="YOUR_PRIVATE_TOKEN"`

3. Confirm that has been added correctly `printenv | grep DISCOGS_TOKEN`

4. To populate the database with the discogs artists: `npm start`

## Load Test

1. Run load testing `npm test` (Take several minutes to finish)
