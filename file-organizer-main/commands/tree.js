const fs = require("fs");
const path = require("path");
// let srcPath = "C:\\Users\\angry\\OneDrive\\Desktop\\fjpdev\\learnNode\\fileOrganizer";

function tree(srcPath){
    if(srcPath==undefined){
        console.log("please enter a valid path");
        process.exit;
    }
   let readFiles =  fs.readdirSync(srcPath);
   let currDir = path.basename(srcPath);
   console.log("@ "+currDir);
//    console.log(readFiles);
    for(let i = 0; i < readFiles.length; i++){
        let fullPathOfFile = path.join(srcPath,readFiles[i]);
        // console.log(fullPathOfFile);
        if(fs.lstatSync(fullPathOfFile).isFile()){
            console.log("--> "+readFiles[i]);
        }else{
            if(readFiles[i]==".git"){
             console.log(">> "+readFiles[i]);
            }else{
            tree(fullPathOfFile);
            }  
        }
    }

}

// tree(srcPath);
module.exports={
    call_tree:tree
}