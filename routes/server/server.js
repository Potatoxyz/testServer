"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Util = require('../../utils/utils');
//使用日志
var log4js = require('log4js');
var logger = log4js.getLogger('cheese');
//连接数据库配置
var sql = require('mssql');
var config = require('./database.config.js');
var dataBase = require('./dataBase/dataBase');
router.get('/', function (req, res, next) {
    res.send({ success: 'true' });
    res.status(200).end();
});
router.post('/goodCode', function (req, res, next) {
    //console.log(req.query);
    console.log(req.body);
    //console.log(req.params);
    var r = { IsSuccess: true, Content: [], ErrorMessage: '' };
    res.send(r);
    res.status(200).end();
});
/**
 前端必须填写和后台相对应的字段名
*/
//var upload = multer({ dest: 'uploads/' }).single('uploadForm'); //上传单个文件 req.file
//var upload = multer({ dest: 'uploads/' }).array('uploadForm',5); //上传多个文件 req.files
var upload = multer({ dest: 'uploads/' }).fields([
    { name: "uploadForm[0]", maxCount: 1 },
    { name: "uploadForm[1]", maxCount: 1 },
    { name: "uploadForm[2]", maxCount: 1 },
    { name: "uploadForm[3]", maxCount: 1 },
    { name: "uploadForm[4]", maxCount: 1 },
    { name: "uploadForm[5]", maxCount: 1 },
]); //上传多个文件 req.files
var uploadPath = path.resolve(__dirname, '../../uploads');
router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            var r_1 = { IsSuccess: false, Content: [], ErrorMessage: '请求错误' };
            res.status(400).send(r_1).end();
            return;
        }
        // console.log(req.file);
        // console.log(req.files);
        logger.info(req.file);
        logger.info(req.files);
        var isFiled = Object.keys(req.files).indexOf('uploadForm[0]') !== -1;
        console.log(isFiled);
        //单文件重命名
        if (req.file && !isFiled) {
            var newPathArr = Util.renameUploadFile(req.file, uploadPath);
        }
        else if (isFiled) {
            var newPathArr = [];
            for (var key in req.files) {
                var tempPath = Util.renameUploadFile(req.files[key][0], uploadPath);
                newPathArr.push(tempPath);
            }
        }
        else {
            var newPathArr = Util.renameUploadFile(req.files, uploadPath);
        }
        // let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        // r.Content=newPathArr;
        var r = { IsSuccess: true, Content: [], ErrorMessage: '' };
        r.Content.push(newPathArr);
        res.send(r);
        res.status(200).end();
    });
});
router.use('/dataBase', dataBase);
module.exports = router;
