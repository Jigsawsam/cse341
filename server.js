const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require(`./data/database`)
const app = express();
// Port for deployment
const  port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
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
