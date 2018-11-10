"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_import_js_1 = require("./common.import.js");
//第一个必须为根路径
common_import_js_1.router.get('/', function (req, res, next) {
    res.send({ success: 'true' });
    res.status(200).end();
});
common_import_js_1.router.post('/goodCode', function (req, res, next) {
    //console.log(req.query);
    console.log(req.body);
    //console.log(req.params);
    var r = { IsSuccess: true, Content: [], ErrorMessage: '' };
    res.send(r);
    res.status(200).end();
});
//上传
var upload = require('./upload/upload');
common_import_js_1.router.use('/upload', upload);
//和数据库相关的api
var dataBase = require('./dataBase/dataBase');
common_import_js_1.router.use('/dataBase', dataBase);
module.exports = common_import_js_1.router;
