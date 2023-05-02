#!/usr/bin/env python
#
# Copyright (c) ZeroC, Inc. All rights reserved.
#

import signal
import sys
import time
import Ice
import vlc
import os
import glob

Ice.loadSlice('Music.ice')
import Demo


class MusicI(Demo.Music):
    def sayHello(self, delay, current):
        if delay != 0:
            time.sleep(delay / 1000.0)
        print("Hello World!")

    def __init__(self) :
        self.vlc = vlc.Instance()
        self.player = self.vlc.media_player_new()
        self.index = 0
        self.partMusic = {}

    def sendMusicPart(self, id, part, current):
        if id not in self.partMusic: self.partMusic[id] = b""
        self.partMusic[id] += part
        return 0

    def uploadMusic(self, id, filename, current):
        file = open("music_server/" + filename, "wb")
        file.write(self.partMusic[id])
        file.close()
        return 0

    def getNewIndex(self, current):
        index = self.index
        self.index += 1
        return index
    
    def playMusic(self, musicName, current):
        file = "music_server/" + musicName + ".mp3"

        if os.path.exists(file) != True: 
            return False
        
        media = self.player.media_new(file)
        media.add_option("sout=#rtp{mux=ts,ttl=10,port=5000,sdp=rtsp://127.0.0.1:5000/music}")
        media.add_option("--no-sout-all")
        media.add_option("--sout-keep")
        media.get_mrl()
        self.player = self.player.media_player_new()
        self.player.set_media(media)

        self.player.play()
        return True

    def stopMusic(self, current):
        self.player.stop()
        return True
    
    def searchMusic(self, musicName, current):
        os.chdir('music_server')
        musicList = []

        for file_name in glob.glob(f'*{musicName}*'):

            if file_name.endswith('.mp3'):
                musicList.append(file_name)

        return musicList
        

    def delete(self, musicName, current):
        file = "music_server/" + musicName + ".mp3"
        print(file)
        if (os.path.exists(file)):
            os.remove(file)
            return True
        return False
    def shutdown(self, current):
        current.adapter.getCommunicator().shutdown()


#
# Ice.initialize returns an initialized Ice communicator,
# the communicator is destroyed once it goes out of scope.
#
with Ice.initialize(sys.argv, "config.server") as communicator:

    #
    # Install a signal handler to shutdown the communicator on Ctrl-C
    #
    signal.signal(signal.SIGINT, lambda signum, frame: communicator.shutdown())

    #
    # The communicator initialization removes all Ice-related arguments from argv
    #
    print(sys.argv[0])
    if len(sys.argv) > 1:
        print(sys.argv[0] + ": too many arguments")
        sys.exit(1)

    adapter = communicator.createObjectAdapter("Music")
    adapter.add(MusicI(), Ice.stringToIdentity("music"))
    adapter.activate()
    communicator.waitForShutdown()
