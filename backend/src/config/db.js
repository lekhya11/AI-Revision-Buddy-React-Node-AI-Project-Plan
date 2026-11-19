// const dotenv = require("dotenv")
const mongoose = require("mongoose")

// dotenv.config()

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");
};

module.exports = connectDB;



// / const { MongoClient } = require('mongodb');

// MongoClient.connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('DB Connected Successfully');
//   })
//   .catch((error) => {
//     console.log('Error', error);
//   });
