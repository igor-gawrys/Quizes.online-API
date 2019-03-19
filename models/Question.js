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
       content: question.content,
       order: question.order || 1,
       user_id: question.user_id,
       quiz_id: question.quiz_id
    }).save();
};

// questionID = Question ID
module.exports.find = async (questionID) => {
    const question = await Question.where('id',questionID).fetch({ withRelated: ['answers'] });
    return question;
};

// questionID = ID
module.exports.delete = async (questionID) => {
    await Question.where('id', questionID).destroy();
    return true;
};

// questionID = ID
module.exports.update = async (questionID,question) => {
    await Question.where('id', questionID).save({
        content: question.content,
        order: question.order
    },{
        method: 'update',
        patch: true
    });
    return true;
};
