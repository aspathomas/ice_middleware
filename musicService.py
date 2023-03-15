import pydub
class MusicService:

    def addMusic(self, music : str) :
        print('test')
        sound = pydub.AudioSegment.from_mp3(music)
        sound.export(out_f = "new.mp3",format = "mp3")
        # with open('music.txt', 'a') as the_file:
        #     the_file.write(music + "\n")
    