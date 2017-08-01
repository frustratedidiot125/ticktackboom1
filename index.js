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

app.launch(function(req, res) {
  var number = Math.floor(Math.random() * 99) + 1;
  res.session('number', number);
  res.session('guesses', 0);
  var prompt = "Guess a number between 1 and 100!";
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('GuessIntent', {
    "slots": { "guess": "NUMBER" },
    "utterances": ["{1-100|guess}"]
  },
  function(req, res) {
    var guesses = (+req.session('guesses')) + 1;
    var guess = req.slot('guess');
    var number = +req.session('number');
    if (!guess) {
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
      res.say("I'm sorry, but " + guess "is not a number. Please try again.");
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
    response.say('Follow the frequent prompts, or say stop at any time to exit.').shouldEndSession(false);
  }
 );

app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
