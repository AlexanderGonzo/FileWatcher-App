import json
import datetime
import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from watchdog.events import LoggingEventHandler

##TODO:  fix watchdog to not duplicate, add a if statement that will handle adding new music
## i.e if the file is already created "currently_playing" is already in Json file just append
## the new music. We are using the json file as a database...
class Watcher: 
    DIR_TO_WATCH = "./"

    def __init__(self):
        self.observer = Observer()
    
    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.DIR_TO_WATCH, recursive=False)
        self.observer.start()
        try:
            while True:
                time.sleep(10)
        except:
            self.observer.stop()
            print("Error")
        
        self.observer.join()
    
class Handler(FileSystemEventHandler):

    @staticmethod
    def on_any_event(event):
        if event.is_directory:
            return None
        
        elif event.event_type == 'created':
            #take any action here when a file is 1st created
            print("Received created event - %s. "  % event.src_path)
        
        elif event.event_type == 'modified':
            #take any action to when file is modified 
            data = {"currently_playing": []}
            database = {"previously_played": []}
            with open("./ktswplay.txt", "r") as infile, open('currentlyPlaying.json', 'a') as f_out:
                for line in infile:
                    curr_playing = line.replace(' ', '').split(';')
                    data["currently_playing"].append({"Artist": curr_playing[0], "Song": curr_playing[1],
                                                    "Album": curr_playing[2], "Time": datetime.datetime.now().strftime("%B %d %H:%M %P")})
                    f_out.write(json.dumps(data))
            #print(data)
            print("Received modified event - %s." % event.src_path)


if __name__ == '__main__':
    w = Watcher()
    w.run()
        





