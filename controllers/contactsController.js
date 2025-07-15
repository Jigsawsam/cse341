const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    
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
    //#swagger.tags=['Contacts']

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

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']

    const contact = {
        firstName: req.body.firstName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb
    .getDatabase()
    .collection('contacts')
    .insertOne(contact);

    if (response.acknowleged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the contact.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']

    const contactsid = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb
    .getDatabase()
    .collection('contacts')
    .replaceOne({_id: contactsid}, contact);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']

    const contactsid = new ObjectId(req.params.id);

    const response = await mongodb
    .getDatabase()
    .collection('contacts')
    .deleteOne({_id: contactsid});

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the contact.');
    }
};

module.exports = {getAll, getSingle, createContact, updateContact, deleteContact};