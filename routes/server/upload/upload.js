"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_import_js_1 = require("../common.import.js");
/**
 前端必须填写和后台相对应的字段名
 */
var renamePath = common_import_js_1.path.resolve(__dirname, '../../../public/images');
var upload = common_import_js_1.multer({ dest: 'public/images/' }).single('uploadFile'); //上传单个文件 req.file
//var upload = multer({ dest: 'public/images/' }).array('uploadForm',5); //上传多个文件 req.files
// var upload = multer({ dest: 'public/images/' }).fields([              //多文件上传，不同的字段名
//     {name:"upload[0]",maxCount:1},
//     {name:"upload[1]",maxCount:1},
//     {name:"upload[2]",maxCount:1},
//     {name:"upload[3]",maxCount:1},
//     {name:"upload[4]",maxCount:1},
//     {name:"upload[5]",maxCount:1},
// ]); //上传多个文件 req.files
common_import_js_1.router.post('/', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.error(err);
            var r = { IsSuccess: false, Content: [], ErrorMessage: '请求错误' };
            res.status(400).send(r).end();
            return;
        }
        console.log(req.file);
        console.log(req.files);
        // logger.info(req.file);
        // logger.info(req.files);
        var isFiled, newPathArr;
        if (req.files) {
            console.log('判断多个文件');
            isFiled = Object.keys(req.files).indexOf('uploadFile[0]') !== -1;
        }
        console.log(isFiled);
        //单文件重命名
        if (req.file && !isFiled) {
            console.log('单文件重命名');
            newPathArr = common_import_js_1.Util.renameUploadFile(req.file, renamePath);
        }
        else if (isFiled) {
            var temp = [];
            for (var key in req.files) {
                var tempPath = common_import_js_1.Util.renameUploadFile(req.files[key][0], renamePath);
                temp.push(tempPath);
            }
            newPathArr = temp;
            console.log('filed文件重命名');
        }
        else {
            newPathArr = common_import_js_1.Util.renameUploadFile(req.files, renamePath);
            console.log('filed文件重命名');
        }
        console.log(newPathArr);
        // let r:resModel={IsSuccess:true,Content:[],ErrorMessage:''};
        // r.Content=newPathArr[0];
        //ckeditor 图片上传iframe跨域的测试
        var filename = common_import_js_1.Util.getFileName(req.file);
        // let r={"fileName":"image(7).png","uploaded":"1","url":"http://localhost:3001/images/"+filename};
        res.send(filename);
        res.status(200).end();
    });
});
module.exports = common_import_js_1.router;
