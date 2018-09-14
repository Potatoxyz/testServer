var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index.html');
});
router.get('/upload', function(req, res, next) {
    res.render('jq_fileUpload.html');
});
router.get('/preview', function(req, res, next) {
    res.render('img-preview.html');
});

module.exports = router;