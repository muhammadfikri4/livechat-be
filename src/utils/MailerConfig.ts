import nodemailer from 'nodemailer';
import { config } from '../libs';
import { MailOptions } from 'nodemailer/lib/smtp-pool';

export const message = (name: string, otp: number) => {
    return `
        <p>Hi ${name},</p>
        <br/>
        <p>Please use the following One Time Password (OTP) to access the form: <span style="color: #059df0">${otp}</span>. Don't share this OTP with anyone.</p>`
}

export const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
        user: config.SMTP_LOGIN,
        pass: config.SMTP_PASSWORD
    }
} as MailOptions);
// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'muhfikriantoaji@gmail.com',
//         pass: 'qvzs ugvq unss wbwq'
//     }
// });

export const SendEmail = async (to: string, name: string, otp: number) => {

    return await transporter.sendMail({
        to,
        from: config.EMAIL_SENDER,
        subject: 'HIMTI UMT Code Verification',
        text: `Your OTP Code Verification is ${otp}`,
        html: message(name, otp),
    })
}