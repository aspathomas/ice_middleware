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

Ice.loadSlice('Music.ice')
import Demo


class MusicI(Demo.Music):
    def sayHello(self, delay, current):
        if delay != 0:
            time.sleep(delay / 1000.0)
        print("Hello World!")

    def __init__(self) :
        self.player = vlc.Instance()
        self.media_player = self.player.media_player_new()
        self.index = 0
        self.uploadingFiles = {}

    def sendMusicPart(self, id, part, current=None):
        if id not in self.uploadingFiles: self.uploadingFiles[id] = b""
        self.uploadingFiles[id] += part
        return 0

    def uploadMusic(self, id, filename, current=None):
        file = open("music_server/" + filename, "wb")
        file.write(self.uploadingFiles[id])
        file.close()
        return 0

    def getNewIndex(self, current=None):
        index = self.index
        self.index += 1
        return index
    
    def playMusic(self, musicName, current=None):
        file = "music_server/" + musicName + ".mp3"
        print(file)
        if os.path.exists(file) != True: return False
        self.media = self.player.media_new(file)

        # Setting media options to cast it
        self.media.add_option("sout=#rtp{mux=ts,ttl=10,port=5000,sdp=rtsp://127.0.0.1:5000/music}")
        self.media.add_option("--no-sout-all")
        self.media.add_option("--sout-keep")
        self.media.get_mrl()

        self.media_player = self.player.media_player_new()
        self.media_player.set_media(self.media)

        self.media_player.play()
        return True

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
