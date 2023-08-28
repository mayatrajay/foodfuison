require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;

// Create a function that returns a promise for connecting to the database
module.exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Fetch data from collections and invoke the callback if needed
    const foodCollection = await mongoose.connection.db.collection("food_items");
    const foodData = await foodCollection.find({}).toArray();

    const categoryCollection = await mongoose.connection.db.collection("foodCategory");
    const categoryData = await categoryCollection.find({}).toArray();

    return { foodData, categoryData };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Export other database-related code here if needed
