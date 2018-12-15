var axios = require("axios");
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys");
var moment = require('moment');
var Spotify = require('node-spotify-api');

//console.log(keys.spotify)
// var spotify = new Spotify(keys.spotify);
var request = require("request")


if (process.argv.length < 3) {
    console.log("no input")
    process.exit(-1);
}

switch (process.argv[2]) {
    case "concert-this": //
        //console.log("concert-this");
        concertThis(process.argv[3]);
        break;
        localStoragels
    case "spotify-this-song":
        // console.log("spotify-this-song");
        spotifyThisSong(process.argv[3]);
        break;
    case "movie-this":
        //  console.log("movie-this");
        moviethis(process.argv[3])
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
    default:
        console.log("unknown: " + process.argv[2])
        break;
}

function concertThis(artist) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        //var queryUrl = "https://rest.bandsintown.com/artists/ladygaga/events?app_id=codingbootcamp"

    // This line is just to help us debug against the actual URL.
    console.log(artist, "is playing at the following locations:");
    axios.get(queryUrl).then(
            response => {
                // console.log(response.data);
                response.data.forEach(function(res) {
                    //console.log(res);
                    console.log(res.venue.name + " in " + res.venue.city + " on " + moment(res.datetime).format('MMMM Do YYYY, h:mm:ss a'));
                });
            })
        .catch(error => {
            console.log(error);
        });
}


function spotifyThisSong(song) {
    console.log(song)
    if (song === undefined) {
        song = "the sign ace of base";
    }

    keys.spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log("error in search: ", err);
        };


        // console.log(data.tracks.items);
        //console.log(data.tracks.items[0].name);
        console.log("*******")
        console.log(data.tracks.items[0].name + " by " + data.tracks.items[0].album.artists[0].name +
            " from the album " + data.tracks.items[0].album.name +
            " Paste the url in browser to hear a preview!: " + data.tracks.items[0].preview_url);



    });
}

function printIfNotUndefined(print1, print2) {
    if (print2 != undefined) console.log(print1, print2);
}

function moviethis(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"
        //var queryUrl = "https://rest.bandsintown.com/artists/ladygaga/events?app_id=codingbootcamp"
        // This line is just to help us debug against the actual URL.
        //console.log(movie);
        //  Title of the movie.*Year the movie came out.*IMDB Rating of the movie.*Rotten Tomatoes Rating of the movie.
        //*Country where the movie was produced.
        //*Language of the movie.
        //*Plot of the movie.
    axios.get(queryUrl).then(
            response => {
                // console.log(response.data);
                var res = response.data;
                // if (response.data instanceof Array) {
                // console.log(res);
                // console.log("--------------------");
                printIfNotUndefined("Title:", res.Title);
                printIfNotUndefined("Year:", res.Year);
                printIfNotUndefined("Rating:", res.Rated);
                printIfNotUndefined("Reviews:", res.Ratings[1].Value);
                printIfNotUndefined("Country:", res.Country);
                printIfNotUndefined("Plot:", res.Plot);
                printIfNotUndefined("Actors:", res.Actors);
                //} else console.log("movie not found: " + movie);
            })
        .catch(error => {
            console.log(error);
        });

}