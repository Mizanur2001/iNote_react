const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log('Connect to Mongodb Successfully');
    })
}

module.exports = connectToMongo;