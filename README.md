# discogs-node-client
DiscoGS API client for node JS

## Installation Instructions

Clone this repository and `cd` into it in a terminal window.

1. `npm install`

## Database

1. Install MongoDB `brew install mongodb@3.4`

2. Create the directory where the data will be stored `mkdir -p data/db`

3. Run mongoDB deamon `npm run-script mongo`

4. Install [`Robo3T`](https://robomongo.org/)

5. Connect to localhost:27017

## Node

1. Create an account https://www.discogs.com and create a token

2. Add the token in the env variables to be used in the node app `export DISCOGS_TOKEN="YOUR_PRIVATE_TOKEN"`

3. Confirm that has been added correctly `printenv | grep DISCOGS_TOKEN`

4. `npm start`
