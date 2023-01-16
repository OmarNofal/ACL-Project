const nodemailer = require('nodemailer')


module.exports = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 587,
    auth: {
      user: "omar.nofal",
      pass: "01UTWIVQuXP1nVnd"
    }
});