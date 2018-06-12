'use strict';

// provides an API for interacting with file system
let fs = require('fs');
// path module handles and transforms file modules
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');
let server = require('httpServer.js');
// let commands = ["read", "create", "update", "destroy"];
let commands = ['read', 'create', 'update', 'destroy'];
// console.log(typeof (petsPath));

// path.basename returns the last portion of a petsPath
// process.argv returns an array containing the command line arguments
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

// if (commands.indexOf(cmd)) {
//     console.error(`Usage: ${node} ${file} ${cmd} [read, create, update, destroy]`);
//     process.exit(1);
// }



if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            // stops execution of program
            throw err;
        }
        // turns JSON string into object
        let pets = JSON.parse(data);
        let index = process.argv[3];
        if (index) {
            console.log(pets[index]);
        } else {
            console.log(pets);
        }

    });

} if (cmd === 'create') {
    fs.readFile ('pets.json', 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      let pets = JSON.parse(data);
      let age = process.argv[3];
      let kind = process.argv[4];
      let name = process.argv[5];
      if(typeof parseInt(age) == 'number') {
        if (kind) {
            if(name) {
                let pet = {age:parseInt(age), kind:kind , name:name};
                pets.push(pet);
                let petsJSON = JSON.stringify(pets);
                fs.writeFile(petsPath, petsJSON, function(writeErr) {
                    if (writeErr) {
                    throw writeErr;
                    }
                    console.log(pets);
                });
                
            }
            else {
                console.error("Usage: node pets.js create AGE KIND NAME")
                process.exit(1);
            }
        }
        else {
            console.error("Usage: node pets.js create AGE KIND NAME")
            process.exit(1);
        }
    }
    else {
        console.error("Usage: node pets.js create AGE KIND NAME")
        process.exit(1);
    }
    });
  }

            // if (cmd === 'update') {
            //     fs.readFile('pets.json', 'utf8', function (readErr, data) {
            //             if (readErr) {
            //                 throw readErr;
            //             }
            //             let pets = JSON.parse(data);
            //             // let index = process.argv[3]
            //             let age = process.argv[3];
            //             let kind = process.argv[4];
            //             let name = process.argv[5];

            //             if (!index || !age || !kind || !name) {
            //                 console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            //                 process.exit(1);
            //             } else {
            //                 pets[index] = {
            //                     age: parseInt(age),
            //                     kind: kind,
            //                     name: name
            //                 }
            //                 let petsJSON = JSON.stringify(pets);

            //                 fs.writeFile(petsPath, petsJSON, (writeErr) => {
            //                     if (writeErr) {
            //                         throw writeErr;
            //                     }

            //                     console.log(pets[index]);
            //                 });

            //             }
            //         })
                
            // } else if (cmd === 'destroy') {
            //     fs.readFile(petsPath, 'utf8', function (readErr, data) {
            //             if (readErr) {
            //                 throw readErr;
            //             }
            //             let pets = JSON.parse(data);
            //             let index = process.argv[3];
            //             let deleted = pets[index];

            //             if (!index) {
            //                 console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
            //                 process.exit(1);
            //             };
    //             })}
    //         })
    
    //     }
    // }
    //                        if (!age) {
    //                     console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
    //                     process.exit(1);
    //                 }
    //                 pets.push(pet);

    //                 let petsJSON = JSON.stringify(pets);

    //                 fs.writeFile(petsPath, petsJSON, function (writeErr) {
    //                     if (writeErr) {
    //                         throw writeErr;
    //                     }
    //                     console.log(pet);
    //                 });
    //             });
    //         } else {
    //             console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    //             process.exit(1);
    //         }
    //     })
    // }