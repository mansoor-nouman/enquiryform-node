const path = require('path');
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
  try {
    const mailOptions = {
      from:  process.env.email,
      to: req.body.email, 
      subject: req.body.subject, 
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
    };  
    transporter.sendMail(mailOptions, function (err, info) {  
      if (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Tryagain later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try    again late'
    });
  }
});

app.listen(4000, () => {
  console.log('server start on port 4000');
});