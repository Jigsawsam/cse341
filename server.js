const express = require('express')
const mongodb = require(`./data/database`)
const app = express();

const  port = process.env.PORT || 3000;

// Register all routes from routes/index.js
app.use('/', require('./routes'));

// Initialize the database connection
mongodb.initDB((err) => {
    if(err){
        console.log(err);
    }
    else{
        // Start listening only after DB is connected
        app.listen (port, () => {console.log(`Database is listening and node running on port ${port} | http://localhost:${port}/`);});
    }
});


