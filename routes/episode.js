var express = require('express');
var router = express.Router();

var episodes = require('../database.json');

/* GET episode listing. */
router.get('/', function(req, res) {
  res.send(episodes);
});

module.exports = router;
