const db = require('../database');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND || 10;

module.exports = {  
    create: async (userData) => {
        try{
            if (await db.users.countDocuments({ username:userData.username })===0){
                userData.password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(SALT_ROUND));
                const { insertedCount } = await db.users.insertOne(userData);
                if (!insertedCount) throw new Error ('insertion failed');
                return true;
            } else {
                throw new Error (`username ${userData.username} already exists`);
            }
        } catch (err) {
            throw new Error (`${err.message}`);
        }
    },

    find: async (username) => {
        const user = await db.users.findOne({ username: username });
        if(!user) throw new Error (`The user ${username} does not exist`);
        return user;
    },

    addFollowingAlbum: async (username, albumName) =>{
        try{
            const { modifiedCount } = await db.users
                .updateOne(
                    { username: username },
                    { 
                        $push:{ 
                            albumsFollowing: { 
                                $each: [albumName]
                            } 
                        } 
                    }
                );
            if (!modifiedCount ) throw new Error ('insertion failed');
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    },

    unFollowingAlbum: async (username, albumName) =>{
        try{
            const { modifiedCount } = await db.users
                .updateOne(
                    { username: username },
                    { 
                        $pull:{ 
                            albumsFollowing: { 
                                $in: [albumName]
                            } 
                        } 
                    }
                );
            if (!modifiedCount ) throw new Error ('insertion failed');
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    },

    deleteAlbumFromFollowing: async (albumName) =>{
        try{
            await db.users
                .updateMany(
                    {},
                    { 
                        $pull:{ 
                            albumsFollowing: { 
                                $in: [albumName]
                            } 
                        } 
                    }
                );
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    },

    countAlbumFollowers: async (albumName)=>{
        try{
            const totalAlbums = await db.users
                .countDocuments(
                    { 
                        albumsFollowing: { 
                            $in: [albumName]
                        } 
                    }
                );
            return totalAlbums;
        }catch(err) {
            throw new Error (`${err.message}`);
        }
    }
};