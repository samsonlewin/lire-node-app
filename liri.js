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
var input = process.argv[3];


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

if (command ==="spotify-this-song"){

	spotify.search({ type: 'track', query: input }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
    console.log("===============================");

});
//if no song is provided then your program will default to
// "The Sign" by Ace of Base

};

if (command ==="movie-this"){

	
}




