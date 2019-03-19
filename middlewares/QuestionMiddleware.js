const Question = require('../models/Question');
exports.perrmission = async (req,res,next) => {
    if(req.body.question_id !=undefined || req.params.question !=undefined){
        const question = await Question.find(req.body.question_id || req.params.question);
         if(question !=null && req.user.id == question.toJSON().user_id){
             req.question = question;
         } else {
             res.json({message:"Ten zasób nie należy do ciebie !"});
         }
    }
    next()
}