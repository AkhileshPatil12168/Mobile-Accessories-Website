const nodemailer = require("nodemailer");
const body = require("./emailPageHtml");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
});

async function mailSender(reciver, reason, subject, link) {
    try {
        const info = await transporter.sendMail({
            from: "camas.in.service@gmail.com",
            to: reciver,
            subject: subject,
            html: body(reason, link),
            amp: body(reason, link),
        });
        return info.messageId;
    } catch (error) {
        console.log(error);
    }
}
module.exports = mailSender;
