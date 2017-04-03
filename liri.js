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

    console.log("===============================");
    console.log("Artist Name: " + JSON.parse(body).artists[0].name);
    console.log("Song Name: "+ JSON.parse(body).name);
    console.log("Preview: "+ JSON.parse(body).preview_url);
    console.log("Album Name: "+ JSON.parse(body).album.name);
    console.log("===============================");
});
}else{
 
    console.log("===============================");
    console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: "+ data.tracks.items[0].name);
    console.log("Preview: "+ data.tracks.items[0].preview_url);
    console.log("Album Name: "+ data.tracks.items[0].album.name);
    console.log("===============================");

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
    console.log("===============================");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).imdbRating);
    console.log("Country of production: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("https://www.rottentomatoes.com/m/"+value)
    console.log("===============================");
  });
  }else{

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
    console.log("https://www.rottentomatoes.com/m/"+value)
    console.log("===============================");
  
  }
  
});
}
};

//============================
//twitter function
function twitterFunction(){
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i=0; i<20; i++){
    console.log("===============================");
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
    console.log("===============================");
};
  }
});
};



