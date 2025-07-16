const router = require('express').Router();

// Import the swagger route
router.use('/', require('./swagger'));

// Simple test route to check server works
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

// Import the contacts route
router.use('/contacts', require('./contactsRoute'));

module.exports = router;
