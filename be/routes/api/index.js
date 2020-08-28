var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET users listing. */
router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, 'have not API'));
});

module.exports = router;
