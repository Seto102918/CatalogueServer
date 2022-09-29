import e from 'express';
import winston from 'winston';
import TransportStream from 'winston-transport';
import transporter from './transporter.js';

class MyTransport extends TransportStream {
    constructor(opt) {
        super(opt);
    }

    log(info, next){
        transporter.sendMail({
            from: process.env.LOG_SENDER_EMAIL,
            to: process.env.LOG_RECIEVER_EMAIL,
            subject: 'Server Error Alert',
            text: info.message
        }, function(err, success){
            if(err) {
                console.log('Failed to send Logs ' + err);
            } else console.log('Success sending log email')
        })

        next();
    }
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({}),
        new MyTransport({
            level: 'error'
        })
    ]
})

export { logger };