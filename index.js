var alexa = require("alexa-app");
var express = require("express");
var M2M = require ("minutes-to-midnight");
var PORT = process.env.PORT || 8080;

var app = express();
var alexaApp = new alexa.app("alexa");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: true,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: false
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");
// Allow this module to be reloaded by hotswap when changed
//module.change_code = 1;

// Define an alexa-app
//var app = new alexa.app('number_guessing_game');
//app.id = require('./package.json').alexa.applicationId;

alexaApp.launch(function(req, res) {
  
 var ctime = new M2M().getTime();
 console.log("getTimeLaunch: " + ctime);
 

  res.say("The current time on the doomsday clock is " + ctime + ". Have a nice day!");
  res.card({
  type: "Simple",
  title: "Doomsday Clock: Current Time", // this is not required for type Simple
  content: ctime
});
    res.shouldEndSession(true);
});

alexaApp.intent('CurrTime', {
    "slots": { },
    "utterances": ["{1-100|guess}"]
  },
  function(req, res) {
   var ctime = new M2M().getTime().then(console.log).catch(console.error);
  
  console.log("getTime: " + ctime);
 

  res.say("The doomsday clock reads " + ctime + ".");
  res.card({
  type: "Simple",
  title: "Doomsday Clock: Current Time", // this is not required for type Simple
  content: ctime
});
    res.shouldEndSession(true);
});

alexaApp.intent('MinToMid', {
    "slots": { },
    "utterances": ["{1-100|guess}"]
  },
  function(req, res) {
   var mtime = new M2M().get();
 console.log("getminutestil: " + mtime);


  res.say("It is currently " + mtime + "minutes to midnight.");
  res.card({
  type: "Simple",
  title: "Doomsday Clock: Minutes til midnight", // this is not required for type Simple
  content: mtime
});
    res.shouldEndSession(true);
});

//module.exports = app;

alexaApp.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok, Goodbye!").shouldEndSession(true);
  }
 );

alexaApp.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Cancelling. Goodbye!").shouldEndSession(true);
  }
 );
alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say('you can say what\'s the current time? or how many minutes until midnight? or say stop at any time to exit.').shouldEndSession(false);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
