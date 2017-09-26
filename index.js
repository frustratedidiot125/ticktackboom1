//var alexa = require("alexa-app");
//var express = require("express");
var M2M = require ('minutes-to-midnight');
//var PORT = process.env.PORT || 8080;

//var app = express();
//var alexaApp = new alexa.app("alexa");

//alexaApp.express({
//  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
 // checkCert: true,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
//  debug: false
//});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
//app.set("view engine", "ejs");
// Allow this module to be reloaded by hotswap when changed
//module.change_code = 1;

// Define an alexa-app
//var app = new alexa.app('number_guessing_game');
//app.id = require('./package.json').alexa.applicationId;

//alexaApp.launch(function(req, res) {
var minutevar;
new M2M().get()
  //  .then(console.log) 
.then(minutevar)
    .catch(console.error);
console.log('minutevar: '+minutevar);
// 3  
var timevar
new M2M().getTime()
 //   .then(console.log)
.then(timevar)
    .catch(console.error);
console.log('timevar: '+timevar);

// 11:57 PM 
//var ctime = new M2M().getTime();
// console.log("getTimeLaunch: " + ctime);
 

