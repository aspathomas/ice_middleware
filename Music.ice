//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

module Demo
{
    sequence<string> strList;
    sequence<byte> byteSeq;
    interface Music
    {
        void sayHello(int delay);
        bool sendMusicPart(int id, byteSeq part);
        bool uploadMusic(int id, string filename);
        bool playMusic(string musicName);
        int getNewIndex();
        void shutdown();
    }
}
