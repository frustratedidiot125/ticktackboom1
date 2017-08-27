var alexa = require('alexa-app');
var express = require("express");
var PORT = process.env.PORT || 8080;
var express_app = express();
//var app = express();
var app = new alexa.app("app");


app.express({
  expressApp: express_app,
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
module.change_code = 1;

// Define an alexa-app
//var app = new alexa.app('number_guessing_game');
//app.id = require('./package.json').alexa.applicationId;
var prompt = "Say generate a password and I'll generate a completely random alphanumeric password of random length for you, or tell me the length that you need, for instance, give me an 8 character password.";
function generatePassword(passwordLength) {
  var numberChars = "0123456789";
  var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  var allChars = numberChars + upperChars + lowerChars;
  var randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

app.launch(function(req, res) {
  
  
  
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('Generate', {
    "slots": { "digits": "numba" },
    "utterances": ["{1-100|guess}"]
  },
  function(req, res) {
    var rnumber = Math.floor(Math.random()*(50-8+1)+8);

    var rawdigits = req.slot('digits');
    // Need yo process rawdigits into prpcrssef digit(s), but also check if valid, damaged, garbage, purposrful jigrry pokery, ..how parse? Parse integer? Convert typento numbrr? Handling form inpit?
   var digits = Number(rawdigits);

  if (!rawdigits){
    var password = generatePassword(rnumber);
    res.say("Your new " + rnumber + " character long password is <prosody rate=\"x-slow\"><say-as interpret-as=\"spell-out\">" + password + "</say></prosidy>.");
    res.card({
  type: "Simple",
  title: "Your Password", // this is not required for type Simple
  content: password
});
    res.shouldEndSession(true);
    
  } else if (isNaN(digits)){
    res.say("Sorry, what I heard was " + rawdigits + ". What I need is a proper number. Please try again.").shouldEndSession(false);
  } else if (rawdigits == "0"){
    res.say("A zero length password wouldn't be very useful. Please try again.").shouldEndSession(false);
  } else if (digits < 0){
    res.say("A password of negative length would be imaginary, or maybe break the laws of physics. Please try again.").shouldEndSession(false);
  } else if (!Number.isInteger(digits)){
    res.say("I can't produce only parts of a character. And if i could, the resultant password wouldn't likely be compatible with, anything. Please try again, and stick to integers.").shouldEndSession(false);
  } else if (digits > 0 && Number.isInteger(digits)){
    var password = generatePassword(digits);
    res.say("Your new " + digits + " character long password is <prosody rate=\"x-slow\"><say-as interpret-as=\"spell-out\">" + password + "</say></prosidy>.");
    res.card({
  type: "Simple",
  title: "Your Password", // this is not required for type Simple
  content: password
});
    res.shouldEndSession(true);
  } else {
    res.say("I'm sorry, I think you tried to specify a password length, but I couldn't understand you. Please try again.").shouldEndSession(false);
  }
});

//module.exports = app;

app.intent("AMAZON.StopIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Ok, Goodbye!").shouldEndSession(true);
  }
 );

app.intent("AMAZON.CancelIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say("Cancelling. Goodbye!").shouldEndSession(true);
  }
 );
app.intent("AMAZON.HelpIntent", {
  "slots": {} },
//"utterances": [ 
 //              "help", "help me"
  //              ]
//  },
  function(request, response) {
    response.say(prompt + ' Follow any prompts, or say stop at any time to exit.').shouldEndSession(false);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
