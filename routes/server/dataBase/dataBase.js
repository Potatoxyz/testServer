"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_import_js_1 = require("../common.import.js");
var sql = require('mssql');
var config = require('../database.config.js');
common_import_js_1.router.get('/', function (req, res) {
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
module.exports = common_import_js_1.router;
