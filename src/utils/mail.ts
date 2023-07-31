import { BaseController } from "../controllers/baseController"
import nodemailer = require('nodemailer');

class SendEmail extends BaseController {

    async sendEmail(to: any, subject: any, body: any) {
        try {
            // Create transporter for sending email
            const transporter = nodemailer.createTransport({
                service: process.env.SERVICE,
                auth: {
                    user: process.env.FROM,
                    pass: process.env.PASSWORD,
                }
            });

            // Create email options
            const mailOptions = {
                from: process.env.FROM,
                to: to,
                subject: subject,
                text: body
            };

            // Send email
            await transporter.sendMail(mailOptions);

        } catch (e) {
            console.error(e);
        }
    };
    
}

export default new SendEmail();
