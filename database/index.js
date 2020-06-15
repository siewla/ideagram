/*------------ MONGO DEPENDENCIES ------------*/
const MongoClient   = require('mongodb').MongoClient;
const dotenv        = require('dotenv');
dotenv.config();

/*------------ GLOBAL CONFIGURATION ------------*/
const MONGO_URL = process.env.MONGODB_URI;

/*------------ DATABASE NAME ------------*/
const DB_NAME = 'ideagram';

/*------------ Collections ------------*/
const COLLECTIONS = {
    USERS: 'users',
    ALBUMS: 'albums'
};

/*------------ Create a new MongoClient------------*/
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

module.exports = {
    async connect () {
        const connection = await client.connect();
        console.log('Connected to MongoDB');
        const db = connection.db(DB_NAME);
        this.users = db.collection(COLLECTIONS.USERS);
        this.albums = db.collection(COLLECTIONS.ALBUMS);
    },

    disconnect () {
        return client.close();
    },
};