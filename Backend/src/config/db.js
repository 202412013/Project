const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);

        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true); 
          }

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
