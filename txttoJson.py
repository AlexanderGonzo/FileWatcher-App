import json
import datetime

##TODO:  Add file listener and SSH destination 

data = {"currently_playing":[]}

with open("./ktswplay.txt", "r") as infile, open('currentlyPlaying.json', 'w') as f_out:
    for line in infile:
        curr_playing = line.replace(' ','').split(';')
        data["currently_playing"].append({"Artist": curr_playing[0], "Song": curr_playing[1], "Album": curr_playing[2],"Time": datetime.datetime.now().strftime("%B %d %H:%M %P")})
        f_out.write(json.dumps(data))
print(data)
