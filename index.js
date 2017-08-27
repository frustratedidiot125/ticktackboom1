var alexa = require('alexa-app');
var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();
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
module.change_code = 1;

// Define an alexa-app
//var app = new alexa.app('number_guessing_game');
//app.id = require('./package.json').alexa.applicationId;
var prompt = "Say generate and I'll generate a completely random password of random length for you, or tell me the length that you need, for instance, give me an 8 character password.";
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
    var number = Math.floor(Math.random()*(50-8+1)+8);

    var rawdigits = req.slot('digits');
    // Need yo process rawdigits into prpcrssef digit(s), but also check if valid, damaged, garbage, purposrful jigrry pokery, ..how parse? Parse integer? Convert typento numbrr? Handling form inpit?
   var digits = Number(rawdigits);

  if (!rawdigits){
    res.say("Here's your password. It's " + number + " characters long. <say-as interpret-as=\"characters\" format=\"glyphs\">" + generatePassword(number) + "</say>.").shouldEndSession(true);
    } else if 

    if(isNaN(digits)){
    res.say("Sorry, I didn't hear a proper number there. Please try again."
  
  If (!guess) {
      res.say("Sorry, I didn't hear a number. The number was " + number);
    } else if (guess == number) {
      res.say("Congratulations, you guessed the number in " + guesses + (guesses == 1 ? " try" : " tries"));
    } else {
      if (guess > number) {
        res.say("Guess lower");
      } else if (guess < number) {
        res.say("Guess higher");
      }
      else if (isNaN(guess)) {
      res.say("I'm sorry, but " + guess + " is not an actual number. Please guess again.");
      res.session('guesses', guesses);
      res.shouldEndSession(false);
        }
      
        res.say("I'm sorry, but I didn't hear a number. Please try again.");
      res.session('guesses', guesses);
      res.shouldEndSession(false);
        
        }
  }
);

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
    response.say(prompt + ' Follow the frequent prompts, or say stop at any time to exit.').shouldEndSession(false);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
