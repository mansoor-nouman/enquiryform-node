const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mansoor30031998@gmail.com',
        pass: 'M@ns234r'
    }
});

module.exports = transporter;