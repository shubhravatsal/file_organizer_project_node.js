// Project --> CLI based file organizer 

// Imports
let helpFunc = require("./commands/help");
let orgFunc = require("./commands/organize");
let treeFunc = require("./commands/tree");

// lets take a command first

let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

// based on cmd we can call command specific functions
switch(command){
    case "tree":
        // console.log("command is tree on path - "+path);
        treeFunc.call_tree(path);
        break;
    case "organize":
        orgFunc.organizefiles(path);
        // console.log("command is organize on path - "+path);
        break;
    case "help":
        helpFunc.help();
        break;
    default:
        console.log("command not found");
        break;
}