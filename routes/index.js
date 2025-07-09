const router = require('express').Router();

// Simple test route to check server works
router.get('/', (req, res) => {res.send('Hello World')});

// All routes for /contacts go into the contacts route file
router.use('/contacts', require('./contactsRoute'));

module.exports = router;
