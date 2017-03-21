var nodemailer = require('nodemailer');
var _ = require('underscore');
var credentials = require('./credentials.js');

module.exports = {
  sendHTMLMail : function (recipients, subject, message, debugMode) {
    var transporter = nodemailer.createTransport({
      service: credentials.emailCredentials.service,
      auth: {
        user: credentials.emailCredentials.username,
        pass: credentials.emailCredentials.password
      }
    });

    var mailOptions = {
      from: '"Westwood Links" <' + credentials.emailCredentials.username + '>',
      to: recipients.join(","),
      subject: subject,
      html: message,
      bcc: null
    };

    if(debugMode){
      mailOptions.bcc = credentials.emailCredentials.bccRecipients.join(",");
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.error(error);
      }

      console.log("Email sent: [%s, %s]", info.messageId, info.response);
    });
  },
  sendTextEmail: function () {
    console.log("Sending PLAIN TEXT format Email");
  }
};

/*

 'use strict';
 const nodemailer = require('nodemailer');

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'gmail.user@gmail.com',
 pass: 'yourpass'
 }
 });

 // setup email data with unicode symbols
 let mailOptions = {
 from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
 to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
 subject: 'Hello ✔', // Subject line
 text: 'Hello world ?', // plain text body
 html: '<b>Hello world ?</b>' // html body
 };

 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
 if (error) {
 return console.log(error);
 }
 console.log('Message %s sent: %s', info.messageId, info.response);
 });
 */