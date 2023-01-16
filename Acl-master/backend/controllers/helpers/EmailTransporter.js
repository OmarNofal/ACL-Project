const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "omarwalidhamed@gmail.com",
    pass: "XVW4QykPcCTbq70t"
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

module.exports = transporter;