var express = require('express');
var router = express.Router();

/* GET home page. */
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
module.exports = router;
export class resModel{
    IsSuccess:boolean;
    Content:Array<any>;
    ErrorMessage:string;
}