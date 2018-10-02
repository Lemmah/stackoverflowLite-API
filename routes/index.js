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

// GET /questions/:id/answers
router.get('/:qID/answers', (req, res) => {
  return res.json({
    response: 'You sent me a PUT request to /answers',
    questionId: req.params.qID,
    answerId: req.params.aID
  });
});

// POST /questions/:id/answers
router.post('/:qID/answers', (req, res) => {
  return res.json({
    response: 'You sent me a POST request to /answers',
    questionId: req.params.qID,
    body: req.body
  });
});

// PUT /questions/:id/answers/:id
router.put('/:qID/answers/:aID', (req, res) => {
  return res.json({
    response: 'You sent me a PUT request to /answers',
    questionId: req.params.qID,
    answerId: req.params.aID,
    body: req.body
  });
});

// DELETE /questions/:id/answers/:id
router.delete('/:qID/answers/:aID', (req, res) => {
  return res.json({
    response: 'You sent me a DELETE request to /answers',
    questionId: req.params.qID,
    answerId: req.params.aID
  });
});

// POST /questions/:id/answers/:id/vote-up
// POST /questions/:id/answers/:id/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
  if(req.params.dir.search(/^(up|down)$/) === -1) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
}, (req, res) => {
  return res.json({
    response: 'You sent me a POST request to /vote-' + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  });
});

module.exports = router;