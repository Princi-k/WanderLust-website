const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");

const Mongoose_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main().then(() =>{
    console.log("Database is connected.");
}).catch(err => {
    console.log(err);
})


async function main(){
    await mongoose.connect(Mongoose_URL);
}

const initDb = async () =>{
    await Listing.deleteMany({});
    initData.data =  initData.data.map((obj) => ({...obj,owner:'66ed7ebe9141da67c5971cf8'}));
    await Listing.insertMany(initData.data);
    console.log("Data is intialized.");
}

initDb();