var fs = require('fs');
var Util = {
    renameUploadFile: function (files, uploadPath) {
        files.forEach(function (file) {
            var file = file;
            var oldPath = uploadPath + '/' + file.filename;
            var newPath = uploadPath + '/' + file.originalname;
            fs.rename(oldPath, newPath, function (err) {
                if (err)
                    console.error(err);
            });
        });
    }
};
module.exports = Util;
