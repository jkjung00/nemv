var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ msg: 'hello', a: '괜찮아' })
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', a: '222' })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'have not API'));
});

router.post('/in', (req, res) => {
  const { id, pwd } = req.body
  console.log(id)
})

module.exports = router;
