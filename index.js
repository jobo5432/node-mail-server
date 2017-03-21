var express    = require('express');
var app        = express();
var MailServer = require('./MailServer.js');
var fs         = require('fs');
var moment     = require('moment');
var bodyParser = require('body-parser');

var PORT_NUM = 3388;

function RespondToMailingListSignUp(req) {
  try {
    var fileContents = fs.readFileSync('./email-list-request-template.html', 'utf8');


    fileContents = fileContents
      .replace(/{{name}}/g, req.body.name)
      .replace(/{{email}}/g, req.body.email)
      .replace(/{{year}}/g, moment().format("YYYY"));

    MailServer.sendHTMLMail([req.body.email, 'westwoodlinks@gmail.com', 'wespga1@comcast.net'], 'WestwoodLinks.com - Mailing List Signup', fileContents, true);
    return true;
  } catch (e) {
    throw e;
  }
}
function RespondToContactFormSubmission(req) {
  try {
    var fileContents = fs.readFileSync('./contact-form-submission-template.html', 'utf8');

    fileContents = fileContents
      .replace(/{{name}}/g, req.body.name)
      .replace(/{{email}}/g, req.body.email)
      .replace(/{{phone}}/g, req.body.phone)
      .replace(/{{message}}/g, req.body.message)
      .replace(/{{year}}/g, moment().format("YYYY"));

    MailServer.sendHTMLMail([req.body.email, 'westwoodlinks@gmail.com', 'wespga1@comcast.net'], 'WestwoodLinks.com - Contact Form Submission', fileContents, true);
    return true;
  } catch (e) {
    throw e;
  }
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send("You shouldn't be meddling here...");
});

app.post('/mailing-list-request', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    RespondToMailingListSignUp(req);
    res.send(JSON.stringify({result: true}));

  } catch (e) {
    res.send(JSON.stringify({result: false, exception: e}));
  }
});

app.post('/contact-us-request', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    RespondToContactFormSubmission(req);

    if(req.body.signup){
      RespondToMailingListSignUp(req);
    }

    res.send(JSON.stringify({result: true}));
  } catch (e) {
    res.send(JSON.stringify({result: false, exception: e}));
  }
});

app.listen(PORT_NUM, function () {
  console.log("Waiting for stuff to come from places beyond...");
})
