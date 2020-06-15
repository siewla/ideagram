const db = require('../database');

const albumsRepositories = {
    getAllAlbums: () => {
        return db.albums.find()
            .toArray();
    },
    
    createAlbum : async (itemObj) => {
        try {
            const { insertedCount } = await db.albums.insertOne(itemObj);
            if (!insertedCount){
                throw new Error('Insertion Failed');
            } else {
                return true;
            }
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item, ${JSON.stringify(itemObj)}`);
        }
    }
};

module.exports = {
    albumsRepositories
};