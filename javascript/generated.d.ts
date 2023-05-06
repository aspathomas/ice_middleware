//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

import * as iceNS0 from "ice"

export namespace Demo {
    type listMusique = string[];

    class listMusiqueHelper {
        static write(outs: iceNS0.Ice.OutputStream, value: listMusique): void;
        static read(ins: iceNS0.Ice.InputStream): listMusique;
    }

    type byteSeq = Uint8Array;

    class byteSeqHelper {
        static write(outs: iceNS0.Ice.OutputStream, value: byteSeq): void;
        static read(ins: iceNS0.Ice.InputStream): byteSeq;
    }

    abstract class MusicPrx extends iceNS0.Ice.ObjectPrx {
        sayHello(delay: number, context?: Map<string, string>): iceNS0.Ice.AsyncResult<void>;
        sendMusicPart(id: number, part: byteSeq, context?: Map<string, string>): iceNS0.Ice.AsyncResult<boolean>;
        uploadMusic(id: number, filename: string, context?: Map<string, string>): iceNS0.Ice.AsyncResult<boolean>;
        playMusic(musicName: string, context?: Map<string, string>): iceNS0.Ice.AsyncResult<boolean>;
        stopMusic(context?: Map<string, string>): iceNS0.Ice.AsyncResult<boolean>;
        _delete(musicName: string, context?: Map<string, string>): iceNS0.Ice.AsyncResult<boolean>;
        searchMusic(titre: string, context?: Map<string, string>): iceNS0.Ice.AsyncResult<listMusique>;
        getNewIndex(context?: Map<string, string>): iceNS0.Ice.AsyncResult<number>;
        shutdown(context?: Map<string, string>): iceNS0.Ice.AsyncResult<void>;

        /**
         * Downcasts a proxy without confirming the target object's type via a remote invocation.
         * @param prx The target proxy.
         * @return A proxy with the requested type.
         */
        static uncheckedCast(prx: iceNS0.Ice.ObjectPrx, facet?: string): MusicPrx;
        /**
         * Downcasts a proxy after confirming the target object's type via a remote invocation.
         * @param prx The target proxy.
         * @param facet A facet name.
         * @param context The context map for the invocation.
         * @return A proxy with the requested type and facet, or nil if the target proxy is nil or the target
         * object does not support the requested type.
         */
        static checkedCast(prx: iceNS0.Ice.ObjectPrx, facet?: string, contex?: Map<string, string>): iceNS0.Ice.AsyncResult<MusicPrx>;
    }

    abstract class Music extends iceNS0.Ice.Object {
        abstract sayHello(delay: number, current: iceNS0.Ice.Current): PromiseLike<void> | void;
        abstract sendMusicPart(id: number, part: byteSeq, current: iceNS0.Ice.Current): PromiseLike<boolean> | boolean;
        abstract uploadMusic(id: number, filename: string, current: iceNS0.Ice.Current): PromiseLike<boolean> | boolean;
        abstract playMusic(musicName: string, current: iceNS0.Ice.Current): PromiseLike<boolean> | boolean;
        abstract stopMusic(current: iceNS0.Ice.Current): PromiseLike<boolean> | boolean;
        abstract _delete(musicName: string, current: iceNS0.Ice.Current): PromiseLike<boolean> | boolean;
        abstract searchMusic(titre: string, current: iceNS0.Ice.Current): PromiseLike<listMusique> | listMusique;
        abstract getNewIndex(current: iceNS0.Ice.Current): PromiseLike<number> | number;
        abstract shutdown(current: iceNS0.Ice.Current): PromiseLike<void> | void;
        /**
         * Obtains the Slice type ID of this type.
         * @return The return value is always "::Demo::Music".
         */
        static ice_staticId(): string;
    }
}
