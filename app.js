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

app.listen(port, () => {
  console.log('Express server is listening on port ' + port);
});