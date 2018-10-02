'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = require('body-parser').json;
const routes = require('./routes/');

app.use(jsonParser());

app.use('/questions', routes);

app.listen(port, () => {
  console.log('Express server is listening on port ' + port);
});