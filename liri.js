var keys = require("./keys.js");
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

var fs = require('fs');
var command = process.argv[2];
var inputName = "";


//============================ tweets query 


//This will show your last 20 tweets and when they were created at in your terminal/bash window
if(command ==="my-tweets"){
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i=0; i<20; i++){
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
};
  }
});
};

//============================ song query 

//this will show the name, artist, album and a preview for a specific track
if (command ==="spotify-this-song"){
theInputName();

	spotify.search({ type: 'track', query: inputName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log("===============================");
    console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: "+ data.tracks.items[0].name);
    console.log("Preview: "+ data.tracks.items[0].preview_url);
    console.log("Album Name: "+ data.tracks.items[0].album.name);
    console.log("===============================");

});
//if no song is provided then your program will default to
// "The Sign" by Ace of Base

};

//============================ movie query 
//This will give the title, year, ratings, country, language, plot, actors and Rotten tomatoes link for a specific movie 

if (command ==="movie-this"){
theInputName();

var queryUrl = "http://www.omdbapi.com/?t=" + inputName + "&y=&plot=short&r=json";
console.log(queryUrl);

request(queryUrl, function(error, response, body) {


  if (!error && response.statusCode === 200) {


    console.log("===============================");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Country of production: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("https://www.rottentomatoes.com/m/"+inputName)
    console.log("===============================");
  }
  //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
});
	
};



//============================
// function that allow to take multiple words in the input

function theInputName(){

  var nodeArgs = process.argv;
  for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    inputName = inputName + "+" + nodeArgs[i];

  }

  else {

    inputName += nodeArgs[i];

  }
}
};

