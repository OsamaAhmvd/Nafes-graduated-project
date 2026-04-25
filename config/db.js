const mongoose = require('mongoose');

<<<<<<< HEAD
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log('MongoDB Connected Successfully');
    console.log('Database Name:', conn.connection.name);
    console.log('Host:', conn.connection.host);

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error; // مهم جدًا بدل process.exit
  }
};

module.exports = connectDB;
=======
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
>>>>>>> 6bd4bb9 (initial commit)
