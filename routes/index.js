const url = require('url');

var express = require('express');
var router = express.Router();

const scrapeSave = require('../controllers/scrapeSave');
const apiSave = require('../controllers/apiSave');

router.get('/', async function(req, res, next) {
  await scrapeSave.scrapeSave();
  res.send('Finished.');
});

router.get('/covid-api', async function(req, res, next) {
  let error = null;
  try {
    await apiSave.apiSave();
  }
  catch(err) {
    console.log(err.message);
    console.log(err.stack);
    error = err.message;
  }
  res.send(error || 'Finished.');
})

module.exports = router;
