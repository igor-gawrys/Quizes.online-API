const Quiz = require('../models/Quiz');
exports.perrmission = async (req,res,next) => {
    if(req.body.quiz_id !=undefined || req.params.quiz !=undefined){
        const quiz = await Quiz.find(req.body.quiz_id || req.params.quiz);
         if(quiz !=null && req.user.id == quiz.toJSON().user_id){
             req.quiz = quiz;
         } else {
             res.json({message:"Ten zasób nie należy do ciebie !"});
         }
    }
    next()
}