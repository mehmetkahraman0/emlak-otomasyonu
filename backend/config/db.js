import mongoose from "mongoose";

const connetcDB = async() => {
    try {
        await mongoose.connect(/atlas link/);
        console.log("MongoAtlas connection ... ");
    } catch (error) {
        console.error(error.message);
//        process.exit(1);
    }
}

export default connetcDB;