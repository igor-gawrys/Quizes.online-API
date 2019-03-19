const bookshelf = require('../config/bookshelf');
const Question = require('../models/Question');

const Quiz = bookshelf.Model.extend({
   tableName:'quizes',
   questions:function() {
    return this.hasMany(Question,'quiz_id','id');
   }
});

module.exports = bookshelf.model('Quiz',Quiz);

module.exports.create = (quiz) => {
    return new Quiz({
       title: quiz.title,
       cover: quiz.cover || null,
       user_id: quiz.user_id
    }).save();
};

// quizID = Quiz ID
module.exports.find = async (quizID) => {
    const quiz = await Quiz.where('id',quizID).fetch({ withRelated: ['questions'] });
    return quiz;
};
