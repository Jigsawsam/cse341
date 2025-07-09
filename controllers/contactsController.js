const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAll = async (req, res) => {
    // Access the 'contacts' collection
    const result = await mongodb
    .getDatabase()
    .collection('contacts')
    .find();

    // Convert cursor to array
    result.toArray().then((contacts) => {
        // Send back JSON response
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

// GET a single contact by ID
const getSingle = async (req, res) => {
    // Convert string id from URL to ObjectId
    const contactsid = new ObjectId(req.params.id);
    
    // Find the document with matching _id
    const result = await mongodb
    .getDatabase()
    .collection('contacts')
    .find({_id: contactsid});

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        // Return only the first document found
        res.status(200).json(contacts[0]);
    });
};

module.exports = {getAll, getSingle};