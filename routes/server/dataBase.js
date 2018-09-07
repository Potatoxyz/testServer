var router = require('./server');
var sql = require('mssql');
var config = {
    user: 'sa',
    password: '1q3e2w4r$,.',
    server: 'dmterp01',
    database: 'erp_product',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
router.get('/menus', function (req, res, next) {
    sql.connect(config).then(function () {
        return (_a = ["select * from Resources"], _a.raw = ["select * from Resources"], sql.query(_a));
        var _a;
    }).then(function (result) {
        console.dir(result);
        res.send(result);
        res.status(200).end();
    }).catch(function (err) {
        res.status(400).end();
    });
    sql.on('error', function (err) {
        console.error('something error');
    });
});
module.exports = router;
