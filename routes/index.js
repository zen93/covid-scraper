const url = require('url');

var express = require('express');
var router = express.Router();

const scrapeSave = require('../controllers/scrapeSave');

router.get('/', async function(req, res, next) {
  await scrapeSave.scrapeSave();
  res.send('Finished.');
});

module.exports = router;
