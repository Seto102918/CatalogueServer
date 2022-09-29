import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.LOG_SENDER_EMAIL,
        pass: process.env.LOG_SENDER_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
})

export default transporter;