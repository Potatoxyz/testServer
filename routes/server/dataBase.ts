var router=require('./server');
const sql = require('mssql');
const config = {
    user: 'sa',
    password: '1q3e2w4r$,.',
    server: 'dmterp01', // You can use 'localhost\\instance' to connect to named instance
    database: 'erp_product',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
router.get('/menus', function(req, res, next) {
    sql.connect(config).then(() => {
        return sql.query`select * from Resources`
    }).then(result => {
        console.dir(result);
        res.send(result);
        res.status(200).end();
    }).catch(err => {
        res.status(400).end();
    });
    sql.on('error', err => {
        console.error('something error');
    });
});
module.exports=router;
