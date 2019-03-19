const bookshelf = require('../config/bookshelf');

const Answer = bookshelf.Model.extend({
   tableName:'answers'
});

module.exports = bookshelf.model('Answer',Answer);

module.exports.create = (answer) => {
    return new Answer({
       content: answer.content,
       question_id: answer.question_id,
       user_id: answer.user_id
    }).save();
};

// answerID = Answer ID
module.exports.find = async (answerID) => {
    const answer = await Answer.where('id',answerID).fetch();
    return answer;
};
