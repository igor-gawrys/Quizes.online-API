const bookshelf = require('../config/bookshelf');

const Answer = bookshelf.Model.extend({
   tableName:'answers'
});

module.exports = bookshelf.model('Answer',Answer);

module.exports.create = (answer) => {
    return new Answer({
       content: answer.content,
       correct: answer.correct,
       question_id: answer.question_id,
       user_id: answer.user_id
    }).save();
};

// answerID = Answer ID
module.exports.find = async (answerID) => {
    const answer = await Answer.where('id',answerID).fetch();
    return answer;
};

// answerID = ID
module.exports.delete = async (answerID) => {
    await Answer.where('id', answerID).destroy();
    return true;
};

// answerID = ID
module.exports.update = async (answerID,answer) => {
    await Answer.where('id', answerID).save({
        content: answer.content,
        correct: answer.correct
    },{
        method: 'update',
        patch: true
    });
    return true;
};
