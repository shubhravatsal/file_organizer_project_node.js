// path module
const path  = require("path");
// fs module
const fs = require("fs");

let types = {
    videos: ["mp4","mkv"],
    archives: ["zip","rar","7z","tar","iso"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","epub","txt"],
    apps: ["exe","dmg","pkg","deb"],
    images: ["jpg","png","jpeg"],
    music:["mp3","wmv"]
}

// organise functions
 function organize(srcPath){
     if(srcPath == undefined){
         console.log(srcPath); // in empty condition it will pass undefined
         srcPath = process.cwd(); // if undefined it takes path as cwd(current working directory)
         console.log("src is cwd now");
     }else{
         console.log("src path ="+srcPath);
     }

     let organizedFiles = path.join(srcPath,"organized_files");
    //  console.log(organizedFiles);

     //fs.mkdirSync() --> creates a directory syncronously to the specified path 
        if(fs.existsSync(organizedFiles)){
        // console.log("folder exists");
        }else{
            fs.mkdirSync(organizedFiles);
        }

        // scan the entire srcPath 
        // so to read all the files in a directory we use the fs module method
        // fs.readdirSync("path"); returns array of all files 
        let allFiles = fs.readdirSync(srcPath);
        // console.log(allFiles);
        //we only need extensions for sorting on basis of file type
        for(let i = 0; i < allFiles.length; i++){
            // let fileName = allFiles[i];
            // let tempfilenamearray = fileName.split(".");
            // let ext = tempfilenamearray[1];
            // let ext = path.extname(allFiles[i]); // when we get ext name using path module function we do not have to hadle for folder(undefined)
            // if(ext!=""){
            // console.log(ext);
            // }
            // console.log(ext);
            let fullPathOfFile = path.join(srcPath,allFiles[i]);
            // console.log(fullPathOfFile);
            // 1 - check if its a file or folder
            let isFile = fs.lstatSync(fullPathOfFile).isFile();
            if(isFile){
                //1.1- get ext name
                let ext = path.extname(allFiles[i]).split(".")[1];
                // console.log(ext);
                 //1.2- get folder name(to which category does the extention belongs)
                 let folderName = getFolderName(ext);
                //  console.log(folderName);
                 //1.3- copy from src folder (srcPath) and paste to destination folder
                 copyFileToDest(srcPath,fullPathOfFile,folderName);
            }
        }
    }

    function getFolderName(ext){
        for(let key in types){
            // console.log(key);
            for(let i = 0; i < types[key].length; i++){
                let xt = types[key][i];
                if(xt == ext){return key;}
            }
        }
        return "others";
        // return folderName;
    }

    function copyFileToDest(srcPath,fullPathOfFile,folderName){
        //get dest folder path 
        let destPath = path.join(srcPath,"organized_files",folderName);
        // check if exist or create folder from path
        if(!fs.existsSync(destPath)){fs.mkdirSync(destPath);}
        //now lets copy files to these folders
        let srcFilePath = fullPathOfFile;
        let baseFilename = path.basename(fullPathOfFile);
        let destFilePath = path.join(destPath,baseFilename);
        fs.copyFileSync(srcFilePath,destFilePath);
        // console.log("i have val = "+fullPathOfFile);

    }

//     let srcPath = "C:\\Users\\angry\\OneDrive\\Desktop\\fjpdev\\learnNode\\fileOrganizer\\downloads";

//   organize(srcPath);

  module.exports = {
      organizefiles : organize
  }