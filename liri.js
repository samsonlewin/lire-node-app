var keys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var tweetId = '837420952375840768';
var spotify = require('spotify');
var request = require('request');
var express = require('express');
var router = express.Router(); 

var client = new twitter ({
	consumer_key: keys.twitterKeys.consumer_key, 
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

var command = process.argv[2];
var inputName = "";

//take the text inside of random.txt and then use it to call one of LIRI's commands.

// I know it can seem silly to care about indentation, but the parsing benefit you get from it
// really is worth it. You can immediately break your code down into smaller blocks and understand what
// is contained within what. Also, you should consider wrapping this code in a function - main benefit
// to that is reusability 🙌

if  (command ==="do-what-it-says"){
fs.readFile('random.txt','utf8',function(err, data){
  var pretierData = data.split(',');
  command = pretierData[0];
  //This will show your last 20 tweets and when they were created at in your terminal/bash window
if(command ==="my-tweets"){
twitterFunction();
}

else if (command ==="spotify-this-song"){
theInputName();
spotifyFunction(pretierData[1]);

}

else if  (command ==="movie-this"){
theInputName();
omdbFunction(pretierData[1]);
  
};

});
}else{

//============================ tweets query 


//This will show your last 20 tweets and when they were created at in your terminal/bash window
if(command ==="my-tweets"){
  twitterFunction();
}

//============================ song query 

//this will show the name, artist, album and a preview for a specific track

else if (command ==="spotify-this-song"){
theInputName();
spotifyFunction(inputName);
//if no song is provided then your program will default to
// "The Sign" by Ace of Base

}

//============================ movie query 
//This will give the title, year, ratings, country, language, plot, actors and Rotten tomatoes link for a specific movie 

else if  (command ==="movie-this"){
theInputName();
omdbFunction(inputName);
	
};

};



//============================
// function that allow to take multiple words in the input

function theInputName(){

  var nodeArgs = process.argv;
  // since nodeArgs is an array, you can actually achieve the same result with the following line of code
  // inputName = nodeArgs.slice(3).join('+')
  // you can read up more on the `.slice` method here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice?v=example

  for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    inputName = inputName + "+" + nodeArgs[i];

  }

  else {

    inputName += nodeArgs[i];

  }
}
};



//============================
//function to run spotify api
function spotifyFunction(value){
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else if (value === ""){
  var songUrl = "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE";
    request(songUrl, function(error, response, body) {

    // Instead of repeatedly parsing the body, you can simply redefine the body as it's parsed result
    body = JSON.parse(body)
    // and then you can save yourself a few key strokes and a few computing cycles like so:

    var errorSpotifyLog = ["===============================",
    "Your song on Spotify",
    "Artist Name: " + body.artists[0].name,
    "Song Name: "+ body.name,
    "Preview: "+ body.preview_url,
    "Album Name: "+ body.album.name,
    "==============================="
    ];

    for (var i=0; i<errorSpotifyLog.length; i++){
          fs.appendFile("log.txt",errorSpotifyLog[i]+"\n",function(err){
          });
          console.log(errorSpotifyLog[i]);
    };
  
});
}else{

  // when you find yourself accessing such a deeply nested piece of data
  // you can go ahead and assign it to a variable for the sake of readability
  var track = data.tracks.items[0]

  var spotifylogText = ["===============================",
  "Your song on Spotify",
  "Artist Name: " + track.artists[0].name,
  "Song Name: "+ track.name,
  "Preview: "+ track.preview_url,
  "Album Name: "+ track.album.name,
  "==============================="
  ]
 
 for (var i=0; i<spotifylogText.length; i++){
          fs.appendFile("log.txt",spotifylogText[i]+"\n",function(err){
          });
          console.log(spotifylogText[i]);
    };

}
});
}

//

//============================
//omdb function
function omdbFunction (value){

  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&r=json";
console.log(queryUrl);

if(value === ""){
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json"
request(queryUrl, function(error, response, body) {

  body = JSON.parse(body)

  var errorOmdbLog =["===============================",
  "Your movie on OMDB",
  "Title: " + body.Title,
  "Release Year: " + body.Year,
  "Rating: " + body.imdbRating,
  "Country of production: " + body.Country,
  "Language: " + body.Language,
  "Plot: " + body.Plot,
  "Actors: " + body.Actors,
  "Rotten Tomatoes Rating: " + body.Ratings[1].Value,
  "https://www.rottentomatoes.com/m/"+value,
  "==============================="
  ];

for (var i=0; i<errorOmdbLog.length; i++){
          fs.appendFile("log.txt",errorOmdbLog[i]+"\n",function(err){
          });
          console.log(errorOmdbLog[i]);
    };

  });
  }else{

request(queryUrl, function(error, response, body) {


  if (!error && response.statusCode === 200) {

    body = JSON.parse(body)

    var omdblogText = ["===============================",
    "Your movie on OMDB",
    "Title: " + body.Title,
     "Release Year: " + body.Year,
      "Rating: " + body.imdbRating, 
      "Country of production: " + body.Country,
      "Language: " + body.Language,
      "Plot: " + body.Plot,
      "Actors: " + body.Actors,
      "Rotten Tomatoes Rating: " + body.Ratings[1].Value,
      "https://www.rottentomatoes.com/m/"+value,
      "==============================="
    ];

    for (var i=0; i<omdblogText.length; i++){
          fs.appendFile("log.txt",omdblogText[i]+"\n",function(err){
          });
          console.log(omdblogText[i]);
    };


  
  }
  
});
}
};

//============================
//twitter function
//This will show your last 20 tweets and when they were created at in your terminal/bash window
function twitterFunction(){
var params = {screen_name: 'realDonladTrump'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    for (var i=0; i<20; i++){


    var twitterLogText = ["===============================",
    "My Tweets",
    tweets[i].created_at,
    tweets[i].text,
    "==============================="
    ];

          fs.appendFile("log.txt",twitterLogText[i]+"\n",function(err){
          });
         console.log(twitterLogText.join("\n"));
    
};
  }
});
};




