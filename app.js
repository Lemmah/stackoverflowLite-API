'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');

const port = process.env.PORT || 3000;
const routes = require('./routes/');

app.use(logger('dev'));
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/stackoverflowLite', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const postingData = (req.method === 'POST');
  if (postingData) {
    const data = req.body.text.trim();
    if (!data || data.length < 2) {
      const err = new Error('post data is too short or empty');
      err.status = 400;
      return next(err);
    }
  }
  next();
});

app.use('/questions', routes);

// catch 404 and forrward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, () => {
  console.log('Express server is listening on port ' + port);
});