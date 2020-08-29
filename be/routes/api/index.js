var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cfg = require('../../../config');

/* GET users listing. */
router.use('/sign', require('./sign'))

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}
router.all('*', function(req, res, next) {
  const token = req.headers.authorization
  verifyToken(token)
    .then(v => {
      // console.log(v)
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});

router.use('/user', require('./user'))
router.use('/test', require('./test'))
router.use('/sign', require('./sign'))
router.use('/manage', require('./manage'))

router.all('*', function(req, res, next) {
  next(createError(404, 'have not API'));
});

module.exports = router;
