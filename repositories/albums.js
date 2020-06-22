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
    },

    addCommentToExistingImage : async (albumName, imageID, commentData)=>{
        const commentIndex = `images.${imageID}.comments`;
        try{
            const { modifiedCount } = await db.albums
                .updateOne({ 
                    name: albumName, 
                },
                { 
                    $push:{
                        [commentIndex]: { 
                            $each: commentData 
                        }
                    }
                }
                );
            if (!modifiedCount ) throw new Error ('insertion failed');
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    },

    deleteAlbumByName: async (albumName) =>{
        const { result } = await db.albums.deleteMany({ name: 
            { '$regex': `^${albumName}$`, 
                $options:'i' } 
        });
        if (!result.n) {
            throw new Error('Item not found');
        } else {
            return result.n;
        }
    },

    deleteImageById: async (albumName, imageID) =>{
        try{
            const { modifiedCount } = await db.albums
                .updateOne({ 
                    name: albumName, 
                },
                { 
                    $pull:{
                        images: { 
                            id : imageID 
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