const Question = require('../models/Question')
exports.show = async (req,res)=>{
    const question = await Question.find(req.params.question);
    res.json({ data:question });
}
exports.create = async (req,res)=>{
    await Question.create({
        title: req.body.title, 
        content: req.body.content,
        order: req.body.order,
        user_id: req.user.id,
        quiz_id: req.body.quiz_id
    });
    res.json({ message:"Prawidłowo utworzono !" });
}
exports.delete = async (req,res)=>{
    const question = await Question.delete(req.params.question);
    res.json({ message:"Prawidłowo usunięto !",deleted:question });
}