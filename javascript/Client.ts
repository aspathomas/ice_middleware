//
// Copyright (c) ZeroC, Inc. All rights reserved.
//

import {Ice} from "ice";
import {Demo} from "./generated";
// import createVlc from '@richienb/vlc';

(async () =>
{
    let communicator:Ice.Communicator;
    try
    {
        communicator = Ice.initialize(process.argv);

        if(process.argv.length > 2)
        {
            throw new Error("too many arguments");
        }

        const proxy = communicator.stringToProxy("music:default -p 10000").ice_twoway().ice_secure(false);

        let twoway = await Demo.MusicPrx.checkedCast(proxy);

        menu();
        let line = null;
        // const vlc = await createVlc();
        // let isPlay = false;
        do
        {
            process.stdout.write("==> ");
            for(line of await getline())
            {
                try
                {
                    if(line == "a")
                    {
                        // let filenameMp3 = prompt("Entrer le nom du musique:\n");
                        // filenameMp3 = filenameMp3 + ".mp3";

                        // // File found
                        // let file = open(filenameMp3, "rb");
                        // let fileSize = os.stat(filenameMp3).st_size;
                        // let [quotient, remainder] = divmod(fileSize, 102400); // 100kB max = 102400 Bytes

                        // let id = await twoway.getNewIndex();

                        // for (let i = 0; i < quotient; i++) {
                        // let part = file.read(102400);
                        // await twoway.sendMusicPart(id, part);
                        // }

                        // part = file.read(remainder);
                        // await twoway.sendMusicPart(id, part);

                        // file.close();

                        // await twoway.uploadMusic(id, filenameMp3);
                        // console.log("La musique a bien été envoyé");
                    }
                    else if(line == "r")
                    {
                        let result = await twoway.searchMusic(null);
                        console.log(result);
                    }
                    else if(line == "s")
                    {
                        // let music = prompt("Entrer le nom du musique:");
                        // let isDelete = await twoway.delete(music);
                        // if (isDelete === true) {
                        //     console.log("La chanson a été supprimé");
                        // } else {
                        //     console.log("échec");
                        // }
                    }
                    else if(line == "j")
                    {
                        // let result = await twoway.playMusic("Back_in_Back - ACDC");
                        // if (result == true) {
                        //     await vlc.command('in_play', {
                        //         input: 'rtsp://127.0.0.1:5000/music',
                        //     })
                        //     isPlay = true;
                        // } else {
                        // console.log("Fichier introuvable");
                        // }
                    }
                    else if(line == "p")
                    {
                        // if (isPlay) {
                        //     await vlc.command('pl_pause');
                        //     isPlay = false;
                        //   } else {
                        //     await vlc.command('pl_play');
                        //     isPlay = true;
                        //   }
                    }
                    else if(line == "t")
                    {
                        // const result = await twoway.stopMusic();
                        // if (result === true) {
                        //     await vlc.command('pl_stop');
                        // } else {
                        //     console.log("Fichier introuvable");
                        // }
                    }
                    else if(line == "q")
                    {
                        await twoway.shutdown();
                    }
                    else if(line == "x")
                    {
                        break;
                    }
                    else if(line == "?")
                    {
                        menu();
                    }
                    else
                    {
                        console.log("unknown command `" + line + "'");
                        menu();
                    }
                }
                catch(ex)
                {
                    console.log(ex.toString());
                }
            }
        }
        while(line != "x");
    }
    catch(ex)
    {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally
    {
        if(communicator)
        {
            await communicator.destroy();
        }
    }
})();

function menu():void
{
    process.stdout.write(
`usage:

    a: ajouter une musique
    r: rechercher une musique par titre
    s: supprimer une musique
    j: jouer une musique
    p: pause
    t: stop
    q: quitter le serveur
    x: exit
`);
}

//
// Asynchonously process stdin lines using a promise
//
function getline():Promise<string>
{
    return new Promise(resolve =>
                       {
                           process.stdin.resume();
                           process.stdin.once("data", buffer =>
                                              {
                                                  process.stdin.pause();
                                                  resolve(buffer.toString("utf-8").trim());
                                              });
                       });
}
