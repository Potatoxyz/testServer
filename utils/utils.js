"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var fs = require('fs');
var Util = {
    renameUploadFile: function (files, uploadPath) {
        var resultPath = [];
        var rename = function (file) {
            var oldPath = uploadPath + '/' + file.filename;
            var newPath = uploadPath + '/' + file.originalname;
            fs.rename(oldPath, newPath, function (err) {
                if (err)
                    console.error(err);
            });
            return newPath;
        };
        if (util_1.isArray(files)) {
            files.forEach(function (file) {
                var newPath = rename(file);
                resultPath.push(newPath);
            });
        }
        else {
            var newPath = rename(files);
            resultPath.push(newPath);
        }
        return resultPath;
    },
    getFileName: function (file) {
        return file.originalname;
    }
};
module.exports = Util;
