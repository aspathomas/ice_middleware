//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

#pragma once

module Demo
{
    sequences<byte> part_music
    interface Hello
    {
        idempotent void sayHello(int delay);
        idempotent void sendPartMusic(part_music);
        idempotent void addMusic(string title);
        void shutdown();
    }
}
