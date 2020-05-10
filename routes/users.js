var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// New route for cool
router.get('/cool', function(req, res, next) {
  res.render('index', {title: 'cool'});
});


module.exports = router;
