var express = require('express');
var multer  = require('multer');
var router = express.Router();
var fs=require('fs');
var path=require('path');
var Util=require('../../utils/utils');
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

/**
 前端必须填写和后台相对应的字段名
*/
var upload = multer({ dest: 'uploads/' }).single('uploadForm'); //上传单个文件 req.file
// var upload = multer({ dest: 'uploads/' }).array('uploadForm'); //上传多个文件 req.files

var uploadPath=path.resolve(__dirname,'../../uploads');
router.post('/upload',function(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            let r:resModel={IsSuccess:false,Content:[],ErrorMessage:'请求错误'};
            res.status(400).send(r).end();
            return;
        }
        // console.log(req.file);
        // console.log(req.files);
        if(req.file){
            var newPathArr=Util.renameUploadFile(req.file,uploadPath);
        }
        else{
            var newPathArr=Util.renameUploadFile(req.files,uploadPath);
        }
        // let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        // r.Content=newPathArr;
        let r={files:[]};
        r.files.push(newPathArr);
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