import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.mongo_uri, {
        dbName: "RestaurantData" 
    })
    .then(() => {
        console.log("Connected to database successfully!");
    })
    .catch(err => {
        console.log(`Error while connecting! ${err}`);
    });
};

