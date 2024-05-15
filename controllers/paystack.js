const https = require('https');
const express = require('express');
const paystackLiveSecret = process.env['PAYSTACK_LIVE_SECRET'];
const paystack = require('paystack')(process.env.PAYSTACK_LIVE_SECRET);
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function validCountries(req, res) {
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/country',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + paystackLiveSecret, // Replace 'SECRET_KEY' with your actual Paystack secret key
    },
  };

  const request = https.request(options, (paystackRes) => {
    let data = '';

    paystackRes.on('data', (chunk) => {
      data += chunk;
    });

    paystackRes.on('end', () => {
      const countryData = JSON.parse(data);
      console.log(countryData);

      // You can customize the response based on your needs
      res.status(200).json(countryData);
    });
  });

  request.on('error', (error) => {
    console.error(error);

    // Handle errors in the response
    res.status(500).json({ message: 'Error fetching valid countries', status: 500 });
  });

  // End the request
  request.end();
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function requestPayment(req, res){
    try {
        const { email, amount } = req.query;
    const params = JSON.stringify({
        email, amount, currency: 'USD'
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + paystackLiveSecret,
            'Content-Type': 'application/json'
        }
    }

    const request = https.request(options, response => {
        let data = ''

        response.on('data', (chunk) => {
            data += chunk
        });

        response.on('end', () => {
            console.log(JSON.parse(data));
            res.status(200).json(JSON.parse(data));
        })
    }).on('error', error => {
        console.error(error)
        res.status(500).json({ message: 'Something went wrong', status: 500 });
    })

    request.write(params)
    request.end()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong', status: 500 });
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const initializePayment = async (req, res) => {
    const {email, amount} = req.query, currency = 'USD';
    const params = {
      email: email,
      amount: amount * 100, // Convert amount to the smallest unit (e.g., cents)
      currency: currency
    };
  
    try {
      const response = await paystack.transaction.initialize(params);
      res.json(response)
    } catch (error) {
      console.error(error);
      res.status(500).json({error});
    }
  };


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function paymentCallback (req, res){
    try {
        const content = req.body;

        console.log(content);

        res.json({
            success: "Your message was received successfully",
            content
        })
    } catch (error) {
        res.status(500).json({
            message: "There was an error processing your request"
        })
        console.error(error);
    }
}

module.exports = {validCountries, requestPayment, paymentCallback, initializePayment};