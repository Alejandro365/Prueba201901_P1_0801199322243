var express = require('express');
var router = express.Router();
var superbowladApi = require('./api/superbowlad');

router.use('/superbowlad', superbowladApi);

module.exports = router;