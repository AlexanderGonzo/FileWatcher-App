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
 */
const fs = require('fs');
var moment = require('moment');
var duration = 3000;

//TODO: Find a way to limit our DB to a week or two.

async function textProcessing() {

    try {
        let data = fs.readFileSync('./ktswplay.txt', 'utf-8');
        
        var currentSongInfo = data.toString().split(/\s*(?:;|$)\s*/);
        var currentTime = (moment().format('MMMM Do h:mm a')) + " ";
        var artist = currentSongInfo[0];
        var song = currentSongInfo[1];
        var record = currentSongInfo[2];
        duration = 138000; //change to currentSongInfo[3] at a later date

        var jsonData = fs.readFileSync('./songList.json');
        var json = JSON.parse(jsonData);

        var newSong = {
            Time: currentTime,
            Artist: artist,
            Song: song,
            Record: record,
        };
        json.push(newSong);

        fs.writeFile('./songList.json', JSON.stringify(json), { flag: "w" }, (err) => {
            if (err) throw err;
            console.log("File has been saved");
        });

    } catch (err) {
        console.log(err);
    }
}setInterval(textProcessing, duration);



