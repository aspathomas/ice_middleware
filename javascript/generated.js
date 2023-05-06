//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ice = require('ice');

//
const _ModuleRegistry = ice.Ice._ModuleRegistry;
const Slice = ice.Ice.Slice;

let Demo = _ModuleRegistry.module("Demo");

Slice.defineSequence(Demo, "listMusiqueHelper", "Ice.StringHelper", false);

Slice.defineSequence(Demo, "byteSeqHelper", "Ice.ByteHelper", true);

const iceC_Demo_Music_ids = [
    "::Demo::Music",
    "::Ice::Object"
];

Demo.Music = class extends ice.Ice.Object
{
};

Demo.MusicPrx = class extends ice.Ice.ObjectPrx
{
};

Slice.defineOperations(Demo.Music, Demo.MusicPrx, iceC_Demo_Music_ids, 0,
{
    "sayHello": [, , , , , [[3]], , , , ],
    "sendMusicPart": [, , , , [1], [[3], ["Demo.byteSeqHelper"]], , , , ],
    "uploadMusic": [, , , , [1], [[3], [7]], , , , ],
    "playMusic": [, , , , [1], [[7]], , , , ],
    "stopMusic": [, , , , [1], , , , , ],
    "delete": ["_delete", , , , [1], [[7]], , , , ],
    "searchMusic": [, , , , ["Demo.listMusiqueHelper"], [[7]], , , , ],
    "getNewIndex": [, , , , [3], , , , , ],
    "shutdown": [, , , , , , , , , ]
});

exports.Demo = Demo;
