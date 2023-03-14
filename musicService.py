class MusicService:

    def addMusic(self, music : str) :
        print('test')
        with open('music.txt', 'a') as the_file:
            the_file.write(music)
    