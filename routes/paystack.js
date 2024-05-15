const express = require('express');
const { requestPayment, paymentCallback, validCountries, initializePayment } = require('../controllers/paystack');

const router = express.Router();

router.get('/validCountries', validCountries);
router.get('/', requestPayment);
router.get('/init', initializePayment)
router.post('/cb', paymentCallback);

module.exports = router;