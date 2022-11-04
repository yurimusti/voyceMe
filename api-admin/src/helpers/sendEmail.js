import nodemailer from 'nodemailer';

const smtpConfig = {
    emailFrom: 'no-reply@idrinks.com.br',
    options: {
        host: 'email-smtp.sa-east-1.amazonaws.com',
        port: 587,
        auth: {
            user: 'AKIAX6WGWXAD6LL5NIP2',
            pass: 'BHPqvi85hRfc40D8VisYP6UM50dnoo2nnnUupACLNDKP'
        }
    }
};

async function sendEmail({ to, subject, html, from = smtpConfig.emailFrom }) {
    const transporter = nodemailer.createTransport(smtpConfig.options);
    await transporter.sendMail({ from, to, subject, html });
}

export default sendEmail;
