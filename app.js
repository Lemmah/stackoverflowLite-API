'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');

const port = process.env.PORT || 3000;
const routes = require('./routes/');

app.use(logger('dev'));
app.use(jsonParser());

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
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, () => {
  console.log('Express server is listening on port ' + port);
});