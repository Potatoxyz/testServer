var express = require('express');
var multer  = require('multer')
var router = express.Router();
var fs=require('fs');
var path=require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({success:'true'});
    res.status(200).end();
});
router.post('/goodCode', function(req, res, next) {
    //console.log(req.query);
    console.log(req.body);
    //console.log(req.params);
    let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
    res.send(r);
    res.status(200).end();
});

var upload = multer({ dest: 'uploads/' }).single('uploadForm');//必须填写字段名
var uploadPath=path.resolve(__dirname,'../uploads');
router.post('/upload',function(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.status(500).end();
            return;
        }
        console.log(req.file);
        var file=req.file;
        var oldPath=uploadPath+'/'+file.filename;
        var newPath=uploadPath+'/'+file.originalname;
        fs.rename(oldPath,newPath,err=>{
            if(err)
                console.error(err);
        });
        let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        res.send(r);
        res.status(200).end();
    })

});
module.exports = router;
export class resModel{
    IsSuccess:boolean;
    Content:Array<any>;
    ErrorMessage:string;
}