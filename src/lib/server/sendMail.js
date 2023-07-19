import { MAIL_PASSSWORD, MAIL_USER } from "$env/static/private";
import { createTransport } from "nodemailer";

/**
 * Send mail to user
 * @param {string} to - the email to send to
 * @param {string} subject 
 * @param {string} text 
 */
export function sendMail(to, subject, text) {
    return new Promise((resolve, reject) => {

        let mailTransporter = createTransport({
            service: 'gmail',
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASSSWORD
            }
        });

        let mailDetails = {
            from: 'notification@friendpals.ca',
            to,
            subject,
            text
        };

        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                return console.log({err, data});
            }
            console.log('Email sent successfully', data);
            return resolve(data);
        });
    })
}