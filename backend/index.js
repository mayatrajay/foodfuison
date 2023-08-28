const express = require('express');
const app = express();
const port = 5000;

// Import and use the connectToDatabase function from db.js
const db = require('./db');
const { connectToDatabase } = db;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use your routes here
app.use('/api/auth', require('./Routes/Auth'));

// Connect to the database and then start the server
connectToDatabase()
  .then(data => {
    // Destructure foodData and categoryData from the data object
    const { foodData, categoryData } = data;

    // Store foodData and categoryData in a global context
    global.foodData = foodData;
    global.foodCategory = categoryData;

    // Start the Express server
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });
