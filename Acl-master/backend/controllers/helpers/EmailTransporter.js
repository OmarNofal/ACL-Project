require('dotenv')
const nodemailer = require('nodemailer')
const env = process.env;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "omarwalidhamed@gmail.com",
    pass: env.GMAIL_PASSWORD
  }
});
function sendEmailTest() {
    transporter.sendMail({
      from: "ACL Coursera <omarwalidhamed@gmail.com>",
      to: "omar.nofal@student.guc.edu.eg",
      subject: "Email Verification",
      text: `Hello Nofal and welcome to ACL Coursera\n`
    });
}

module.exports =  transporter;