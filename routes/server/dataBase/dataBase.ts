import {resModel,express,multer,router,fs,path,Util} from '../common.import.js';
const sql = require('mssql');
var config=require('../database.config.js');
router.get('/',function (req, res) {
    sql.connect(config).then(() => {
        return sql.query`select * from Resources`;
    }).then(result => {
        res.send(result);
        res.status(200).end();
    }).catch(err => {
        console.log(err);
        res.send("查询失败");
        res.status(400).end();
    });
    sql.on('error', err => {

    });
});
module.exports=router;