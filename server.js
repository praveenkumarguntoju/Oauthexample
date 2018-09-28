var express = require("express");
var app = express();

var mongoose = require("mongoose");
// console.log(mongoose);
var morgan = require("morgan");

var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

var file = fs.createWriteStream(__dirname + "/acess.log", { flags: "a" });
app.use(morgan("combined", { stream: file }));

app.use(express.static("static"));

/*praveen*/
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "61412464518-tmt9rvl8lgmbmi2jqgm9qivjt4dh8e57.apps.googleusercontent.com",
  "4qzu1PfH6i5HqFpbPwuuI8Ez",
  "http://localhost:8082/oauthcallback"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes
});

app.get("/url", function(req, res) {
  res.send(url);
});
app.get("/token", function(req, res) {
  var code = req.query.code;
  oauth2Client.getToken(code, function(err, tokens) {
    oauth2Client.setCredentials(tokens);
    res.send(tokens);
  });
});

var server = app.listen(process.env.PORT || 8082, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
