import {isArray} from "util";

var fs=require('fs');
var Util={
    renameUploadFile:function (files:any,uploadPath:string) {
        let resultPath=[];
        var rename=function (file) {
            var oldPath=uploadPath+'/'+file.filename;
            var newPath=uploadPath+'/'+file.originalname;
            fs.rename(oldPath,newPath,err=>{
                if(err){
                    console.error(err);
                }
            });
            return newPath;
        };
        if(isArray(files)){
            files.forEach(file=>{
                var newPath=rename(file);
                resultPath.push(newPath);
            });
        }
        else{
            var newPath=rename(files);
            resultPath.push(newPath);
        }
        return resultPath;
    },
    getFileName:function (file):string {
        return file.originalname;
    }
};
module.exports=Util;