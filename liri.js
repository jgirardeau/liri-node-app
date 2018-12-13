var axios = require("axios");
require('dotenv').config();
var keys = require("./keys");
//console.log(keys.spotify);

if (process.argv.length < 3) {
    console.log("no input")
    process.exit(-1);
}

switch (process.argv[2]) {
    case "concert-this":
        //console.log("concert-this");
        concertThis(process.argv[3]);
        break;
        localStoragels
    case "spotify-this-song":
        console.log("spotify-this-song");
        break;
    case "movie-this":
        console.log("movie-this");
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
                    console.log(res.venue.name + " in " + res.venue.city + " on " + res.datetime);
                });
            })
        .catch(error => {
            console.log(error);
        });
}