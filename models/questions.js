'use strict';
 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function compareAnswers(ans1, ans2) {
  // - ans1 before ans2
  // 0 no change
  // + ans2 before ans1
  console.log(ans1.updatedAt, ans2.updatedAt);
  if (ans1.votes == ans2.votes) {
    return ans2.updatedAt - ans1.updatedAt;
  }
  return ans2.votes - ans1.votes;
}

const AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

AnswerSchema.method('update', function(updates, callback) {
  Object.assign(this, updates, {updatedAt: new Date()});
  this.parent().save(callback);
});

AnswerSchema.method('vote', function(vote, callback) {
  if (vote == 'up') {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

const QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
});

// Presave callback to sort before saving
QuestionSchema.pre('save', function(next) {
  this.answers.sort(compareAnswers);
  next();
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports.Question = Question;