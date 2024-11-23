const mongoose = require('mongoose');
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        who: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        collegeName: {
            type: String,
            required: true
        },
        orderId: {
            type: String,
           
        },
        amount: {
            type: String,
            
        },
        customerId: {
            type: String,
           
        }
});
module.exports = User;