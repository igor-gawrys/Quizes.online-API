const bookshelf = require('../config/bookshelf');
const Answer = require('../models/Answer');

const Question = bookshelf.Model.extend({
   tableName:'questions',
   answers:function() {
    return this.hasMany(Answer,'question_id','id');
   }
});

module.exports = bookshelf.model('Question',Question);

module.exports.create = (question) => {
    return new Question({
       title: question.title,
       content: question.content,
       order: question.order || 1,
       user_id: question.user_id,
       quiz_id: question.quiz_id
    }).save();
};

// questionID = Question ID
module.exports.find = async (questionID) => {
    const question = await Question.where('id',questionID).fetch();
    return question;
};
