var fs=require('fs');
var Util={
    renameUploadFile:function (files:Array<any>,uploadPath:string) {
        files.forEach(file=>{
            var file=file;
            var oldPath=uploadPath+'/'+file.filename;
            var newPath=uploadPath+'/'+file.originalname;
            fs.rename(oldPath,newPath,err=>{
                if(err)
                    console.error(err);
            });
        })
    }
};
module.exports=Util;