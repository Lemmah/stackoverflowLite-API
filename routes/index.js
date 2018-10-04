'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./../models/questions').Question;

// handler for qID param
router.param('qID', (req, res, next, id) => {
  Question.findById(id, (err, questionDoc) => {
    if (err) return next(err);
    if (!questionDoc) {
      err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
    req.question = questionDoc;
    next();
  });
});

// handler for aID param
router.param('aID', (req, res, next, id) => {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    const err = new Error('Not found');
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
router.get('/', (req, res, next) => {
  Question.find({})
    .sort({createdAt: -1})
    .exec((err, questions) => {
      if (err) return next(err);
      res.json(questions);
    });
});

// POST /questions
router.post('/', (req, res, next) => {
  const question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/id
router.get('/:qID', (req, res, next) => {
  res.json(req.question);
});

// GET /questions/:id/answers
router.get('/:qID/answers', (req, res) => {
  res.json(req.question.answers);
});

// POST /questions/:id/answers
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:id/answers/:id
router.put('/:qID/answers/:aID', (req, res) => {
  req.answer.update(req.body, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// DELETE /questions/:id/answers/:id
router.delete('/:qID/answers/:aID', (req, res) => {
  req.answer.remove((err) => {
    if (err) return next(err);
    req.question.save((err, question) => {
      if (err) return next(err);
      res.json(question);
    })
  })
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
    req.vote = req.params.dir;
    next();
  }
}, (req, res, next) => {
  req.answer.vote(req.vote, (err, question) => {
    if (err) return next(err);
    res.json(question);
  });
});

module.exports = router;