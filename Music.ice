//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

module Demo
{
    sequence<string> listMusique;
    sequence<byte> byteSeq;
    interface Music
    {
        void sayHello(int delay);
        bool sendMusicPart(int id, byteSeq part);
        bool uploadMusic(int id, string filename);
        bool playMusic(string musicName);
        bool delete(string musicName);
        listMusique searchMusic(string titre);
        int getNewIndex();
        void shutdown();
    }
}
