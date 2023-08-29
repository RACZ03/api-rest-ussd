const express = require('express')
const router = express.Router()

// import controller search
const ussdController = require('../controller/ussd');


// handle incoming request to /ussd
router.post('/search', ussdController.searchRecords);

module.exports = router