import {resModel,express,multer,router,fs,path,Util} from './common.import.js';
//第一个必须为根路径
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
//和数据库相关的api
var dataBase=require('./dataBase/dataBase');
router.use('/dataBase',dataBase);

module.exports = router;
