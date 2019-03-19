const Answer = require('../models/Answer')
exports.show = async (req,res)=>{
    const answer = await Answer.find(req.params.answer);
    res.json({ data:question });
}
exports.create = async (req,res)=>{
    await Answer.create({
        content: req.body.content,
        question_id: req.body.question_id,
        user_id: req.body.user_id
    });
    res.json({ message:"Prawidłowo utworzono !" });
}
exports.delete = async (req,res)=>{
    const answer = await Answer.delete(req.params.answer);
    res.json({ message:"Prawidłowo usunięto !",deleted:answer });
}