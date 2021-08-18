const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Form = require('../models/form');
const nodemailer = require('nodemailer');



//mail sender details
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})


router.post('/form', async(req, res) => {

    const { email, name, message } = req.body;

    try {
        const form = new Form({
            email,
            name,
            message
        });
        const createdForm = await form.save();
        //send verification mail to user
        const mailOptions = {
            from: 'drsimplegraffiti@gmail.com',
            to: form.email,
            subject: 'Thank-you email',
            html: `<h2>${form.name}! Thanks for contacting me </h2> 
                  <p>${form.message}</p>
            `
        }

        //sending mail
        transporter.sendMail(mailOptions, function(error, data) {
            if (error) {
                console.log(error)
            } else {
                console.log('an email has been sent to your mail')
            }
        });
        // BlogPost
        return res.render('success');
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: error,
            data: {
                message: "Server Error",
            },
        });
    }
});




module.exports = router;