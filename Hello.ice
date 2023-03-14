//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

#pragma once

module Demo
{
    interface Hello
    {
        idempotent void sayHello(int delay);
        idempotent void addMusic(string music);
        void shutdown();
    }
}
