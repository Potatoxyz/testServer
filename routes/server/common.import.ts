import {resModel} from "../models/response.model";
var express = require('express');
var multer  = require('multer');
var router = express.Router();
var fs=require('fs');
var path=require('path');
var Util=require('../../utils/utils');

//使用日志
const log4js = require('log4js');
const logger = log4js.getLogger('cheese');

export {resModel,express,multer,router,fs,path,Util,logger};