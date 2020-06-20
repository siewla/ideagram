const db = require('../database');

const albumsRepositories = {
    getAllAlbums: () => {
        return db.albums.find()
            .toArray();
    },

    getAlbumByName: async (name) => {
        return db.albums.findOne({ name:name });
    },
    
    createAlbum : async (album) => {
        try {
            if (await db.albums.countDocuments({ name:album.name }) === 0){
                const { insertedCount } = await db.albums.insertOne(album);
                if (!insertedCount) throw new Error ('insertion failed');
                return true;
            } else{
                throw new Error (`Album ${album.name} already exists`);
            }
        } catch (err) {
            throw new Error(`${err.message}`);
        }
    },

    addImageToExistingAlbum : async (albumName, imageData) =>{
        try{
            const { modifiedCount } = await db.albums
                .updateOne(
                    { name: albumName },
                    { 
                        $push:{ 
                            images: { 
                                $each: imageData 
                            } 
                        } 
                    }
                );
            if (!modifiedCount ) throw new Error ('insertion failed');
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    }
};

module.exports = {
    albumsRepositories
};