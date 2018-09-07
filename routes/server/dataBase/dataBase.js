var express = require('express');
var router = express.Router();
var sql = require('mssql');
var config = require('../database.config.js');
router.get('/', function (req, res) {
    sql.connect(config).then(function () {
        return (_a = ["select * from Resources"], _a.raw = ["select * from Resources"], sql.query(_a));
        var _a;
    }).then(function (result) {
        res.send(result);
        res.status(200).end();
    }).catch(function (err) {
        console.log(err);
        res.send("查询失败");
        res.status(400).end();
    });
    sql.on('error', function (err) {
    });
});
module.exports = router;
