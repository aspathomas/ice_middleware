#!/usr/bin/env python
#
# Copyright (c) ZeroC, Inc. All rights reserved.
#

import Ice
import glob
import vlc
import os
import sys

Ice.loadSlice('Music.ice')
import Demo

class Lecteur:

    def __init__(self):
        self.vlcInstance = vlc.Instance()
        self.player = self.vlcInstance.media_player_new()
        self.player.set_mrl("rtsp://127.0.0.1:5000/music")

    def pause(self):
        self.player.pause()

    def play(self):
        self.player.play()

    def stop(self):
        self.player.stop()

def run(communicator):
    twoway = Demo.MusicPrx.checkedCast(
        communicator.propertyToProxy('Music.Proxy').ice_twoway().ice_secure(False))
    if not twoway:
        print("invalid proxy")
        sys.exit(1)

    oneway = Demo.MusicPrx.uncheckedCast(twoway.ice_oneway())
    batchOneway = Demo.MusicPrx.uncheckedCast(twoway.ice_batchOneway())
    datagram = Demo.MusicPrx.uncheckedCast(twoway.ice_datagram())
    batchDatagram = Demo.MusicPrx.uncheckedCast(twoway.ice_batchDatagram())
    
    secure = False
    timeout = -1
    delay = 0

    menu()

    lecteur = Lecteur()

    c = None
    while c != 'x':
        try:
            sys.stdout.write("==> ")
            sys.stdout.flush()
            c = sys.stdin.readline().strip()
            if c == 'a':

                filenameMp3 = "Back_in_Black.mp3"

                # File found
                file = open(filenameMp3, "rb")
                fileSize = os.stat(filenameMp3).st_size
                quotient, remainder = divmod(fileSize, 102400)  # 100kB max = 102400 Bytes

                id = twoway.getNewIndex()

                for i in range(quotient):
                    part = file.read(102400)
                    twoway.sendMusicPart(id, part)

                part = file.read(remainder)
                twoway.sendMusicPart(id, part)

                file.close()

                twoway.uploadMusic(id, filenameMp3)
                print("La musique a bien été envoyé")

            elif c == 'r':
                name = input("Entrer le nom du musique:\n")
                list = twoway.searchMusic(name)
                print(list)
            elif c == 's':
                name = input("Entrer le nom du musique:\n")
                isDelete = twoway.delete(name)
                if isDelete is True:
                    print("La chanson a été supprimé")
                else:
                    print("échec")
            elif c == 'j':
                result = twoway.playMusic("Back_in_Back")
                if result == True:
                    lecteur.play()
                else:
                    print("Fichier introuvable")
            elif c == 'q':
                twoway.shutdown()
            elif c == 'x':
                pass  # Nothing to do
            else:
                print("unknown command `" + c + "\'")
                menu()
        except Ice.Exception as ex:
            print(ex)


def menu():
    print("""
        a: ajouter une musique
        r: rechercher une musique par titre
        s: supprimer une musique
        j: jouer une musique
        q: quitter le serveur
        x: exit
    """)


#
# Ice.initialize returns an initialized Ice communicator,
# the communicator is destroyed once it goes out of scope.
#
with Ice.initialize(sys.argv, "config.client") as communicator:

    #
    # The communicator initialization removes all Ice-related arguments from argv
    #
    if len(sys.argv) > 1:
        print(sys.argv[0] + ": too many arguments")
        sys.exit(1)

    run(communicator)
