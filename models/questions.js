'use strict';
 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

const QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;