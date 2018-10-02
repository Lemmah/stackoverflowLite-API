'use strict';

const express = require('express');
const router = express.Router();

// GET /questions
router.get('/', (req, res) => {
  return res.json({response: 'You sent me a GET request'});
});

// POST /questions
router.post('/', (req, res) => {
  return res.json({
    response: 'You sent me a POST request',
    body: req.body
  });
});

// GET /questions
router.get('/:id', (req, res) => {
  return res.json({response: 'You sent me a GET request at ID ' + req.params.id});
});


module.exports = router;