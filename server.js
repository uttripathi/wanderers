const express = require('express');
const bodyParser = require('body-parser');
const checksum_lib = require('paytmchecksum');
const https = require('https');
const cors = require('cors'); // Import the cors package

const app = express();

// Use the CORS middleware
app.use(cors());

app.use(bodyParser.json());

app.post('/generateTransactionToken', (req, res) => {
    const { orderId, amount, customerId } = req.body;

    const paytmParams = {
        body: {
            requestType: 'Payment',
            mid: 'YOUR_MERCHANT_ID', // Replace with your Merchant ID
            websiteName: 'WEBSTAGING', // Use 'WEBSTAGING' for testing
            orderId: orderId,
            callbackUrl: 'https://YOUR_CALLBACK_URL',
            txnAmount: {
                value: amount,
                currency: 'INR',
            },
            userInfo: {
                custId: customerId,
            },
            enablePaymentMode: [{ mode: 'UPI' }], // Enable UPI mode
        },
    };

    checksum_lib.generateSignature(JSON.stringify(paytmParams.body), 'YOUR_MERCHANT_KEY') // Replace with your Merchant Key
        .then((checksum) => {
            paytmParams.head = { signature: checksum };

            const options = {
                hostname: 'securegw-stage.paytm.in', // Use 'securegw.paytm.in' for production
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${paytmParams.body.mid}&orderId=${orderId}`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };

            const request = https.request(options, (response) => {
                let responseData = '';
                response.on('data', (chunk) => { responseData += chunk; });
                response.on('end', () => {
                    res.json(JSON.parse(responseData));
                });
            });

            request.write(JSON.stringify(paytmParams));
            request.end();
        })
        .catch((err) => {
            res.status(500).json({ error: 'Checksum generation failed', details: err });
        });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
