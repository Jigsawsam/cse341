const dotenv = require('dotenv')
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

// connect once to MongoDB and assign database instance to 'database'
let database;

// Function to connect to MongoDB
const initDB = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }

    // Connect to MongoDB using connection string from .env
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        
        // Get the connected database (from the connection string) and assign it to the 'database' variable
        database = client.db();
      callback(null, database);
    })
    .catch((err) => {
        callback(err);
    })
};

// Verify that the database is connected before returning it as an object
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database;
};

module.exports = {initDB, getDatabase}