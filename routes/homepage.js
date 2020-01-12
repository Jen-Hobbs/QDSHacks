const express = require('express');
const parkingMeterInformation = require('../controllers/parkingMeterInformation');
const router = express.Router();
router.get('/', parkingMeterInformation.getTable);
module.exports = router;
