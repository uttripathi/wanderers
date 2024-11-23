const express = require('express');
const bodyParser = require('body-parser');
const checksum_lib = require('paytmchecksum');
const cors = require('cors');
const user=require('./user');
const mongoose=require('mongoose');

const app = express();

app.use(cors());

app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/wanderers', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


app.post('/generateTransactionToken', async(req, res) => {
    const {name, email, phone, who, destination, collegeName, orderId, amount, customerId } = req.body;

    if (!name || !email || !phone || !who || !destination || !collegeName || !orderId || !amount || !customerId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const traveller= await user.create({ name, email, phone, who, destination, collegeName, orderId, amount, customerId });
    res.status(200).json({message: "success", data:traveller}); //remove it when you have to manage gateway

/*     const paytmParams = {
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
        }); */

});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

