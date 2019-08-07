/**
 * KTSW Notes: 
 * What does this script do? 
 * This Javascript file allows us to watch for any 
 * changes to our ktswplay.txt. If there are changes then the script
 * will add the artist, song, and record name to our database to be 
 * displayed to the user. 
 * 
 * Troubleshooting:
 * If our service history functionality ever goes down, check here first
 * make sure the script is running. 
 * 
 * The command to run this script is node fileWatcher.js
 * 
 * Emergencies 
 * If you need further assistance contanct Alexander Gonzalez or Zach Collins. 
 * If you do not have their contanct information ask Dan or your Station Manager
 * 
 * Script was written by Alexander Gonzalez 4/23/2019
 * 
 * Loop forever and sleep for 3 seconds and then send a request to get the latest data
 * request scope vs server scope
 * DO THIS BUT IN SERVICE SCOPE IT WILL LIVE FOREVER ADD DURATION TIME, THE GLOBAL VAR(SONG,ARTISTS,RECORD,DURATIONTIME) 
 * THE WATCHFILE WILL HAPPEN HERE. SET A TIMER USING THE DURATION TIME
 * 
 * TODO:
 * Create a counter=1000 erase the songs
 * Export the information to the DOM elements
 * instead of txt files we can also consider using Json files, and then
 * displaying the json in HTML via: https://www.w3schools.com/js/js_json_html.asp
 * 
 */
const fs = require('fs');
const nowPlayingFile = 'ktswplay.txt';

var currentArtist = ' ';
var currentSong = ' ';
var currentRecord = ' ';

let data = fs.readFileSync(nowPlayingFile, 'utf-8');
var currentSongInfo = data.toString().split(/\s*(?:;|$)\s*/);

var moment = require('moment');
var currentTime = (moment().format('MMMM Do h:mm a')) + " ";


console.log(`Watching for file changes on ${nowPlayingFile}`);

fs.watchFile(nowPlayingFile, { interval: 1000 }, (curr, prev) => {

    

    var jsonString = JSON.stringify(currentSongInfo);
    console.log(jsonString);

    currentArtist = currentSongInfo[0];
    currentSong = currentSongInfo[1];
    currentRecord = currentSongInfo[2];
    
    console.log("Artist: " + currentArtist);
    console.log("Song: " + currentSong);
    console.log("Record: " + currentRecord);
    
    var stream = fs.createWriteStream("recentlyPlayed.txt", { flags: 'a' });
    stream.write(currentTime);
    currentSongInfo.forEach(function (item){
            stream.write(item + ' ' );
           
    });
    stream.write('\n');
    stream.end(); 
    
    
});

fs.watchFile('./recentlyPlayed.txt', { interval: 1000 }, (curr, prev) => {
    var i;var count = 0;
    var tempData = currentTime + currentSongInfo + '\n';
    fs.createReadStream("./recentlyPlayed.txt")
        .on('error', e => callback(e))
        .on('data', chunk => {
            for (i=0; i < chunk.length; ++i) 
                if (chunk[i] == 10) count++;
                if(count > 1000){
                    fs.writeFile("./recentlyPlayed.txt", tempData , function(){console.log("count: " + count);})
                    count = 0;
                }
        });
});