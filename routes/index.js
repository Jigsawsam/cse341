const router = require('express').Router();

router.use('/', require('./swagger'));

// Simple test route to check server works
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

// All routes for /contacts go into the contacts route file
router.use('/contacts', require('./contactsRoute'));

module.exports = router;
