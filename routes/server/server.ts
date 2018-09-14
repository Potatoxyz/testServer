import {resModel} from "../models/response.model";
var express = require('express');
var multer  = require('multer');
var router = express.Router();
var fs=require('fs');
var path=require('path');
var Util=require('../../utils/utils');

//使用日志
const log4js = require('log4js');
const logger = log4js.getLogger('cheese');
//连接数据库配置
const sql = require('mssql');
var config=require('./database.config.js');
var dataBase=require('./dataBase/dataBase');
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
//var upload = multer({ dest: 'uploads/' }).single('uploadForm'); //上传单个文件 req.file
//var upload = multer({ dest: 'uploads/' }).array('uploadForm',5); //上传多个文件 req.files
var upload = multer({ dest: 'uploads/' }).fields([              //多文件上传，不同的字段名
    {name:"uploadForm[0]",maxCount:1},
    {name:"uploadForm[1]",maxCount:1},
    {name:"uploadForm[2]",maxCount:1},
    {name:"uploadForm[3]",maxCount:1},
    {name:"uploadForm[4]",maxCount:1},
    {name:"uploadForm[5]",maxCount:1},
]); //上传多个文件 req.files
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
        logger.info(req.file);
        logger.info(req.files);
        var isFiled=Object.keys(req.files).indexOf('uploadForm[0]')!==-1;
        console.log(isFiled);
        //单文件重命名
        if(req.file&&!isFiled){
            var newPathArr:any[]=Util.renameUploadFile(req.file,uploadPath);
        }
        //filed文件重命名
        else if(isFiled){
            var newPathArr=[];
            for(var key in req.files){
                let tempPath=Util.renameUploadFile(req.files[key][0],uploadPath);
                newPathArr.push(tempPath);
            }
        }
        //同字段多文件重命名
        else{
            var newPathArr:any[]=Util.renameUploadFile(req.files,uploadPath);
        }
        // let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        // r.Content=newPathArr;
        let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        r.Content.push(newPathArr);
        res.send(r);
        res.status(200).end();
    })

});
router.use('/dataBase',dataBase);
module.exports = router;
