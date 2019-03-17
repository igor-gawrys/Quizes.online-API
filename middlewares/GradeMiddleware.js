const Grade = require('../models/Grade');
exports.perrmission = async (req,res,next) => {
    if(req.body.grade_id !=undefined || req.params.grade !=undefined){
        const grade = await Grade.find(req.body.grade_id || req.params.grade);
         if(grade !=null && req.user.id == grade.toJSON().user_id){
             req.grade = grade;
         } else {
             res.json({message:"Ten zasób nie należy do ciebie !"});
         }
    }
    next()
}