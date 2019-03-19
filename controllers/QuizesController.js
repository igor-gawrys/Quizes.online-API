const User = require('../models/User')
const Quiz = require('../models/Quiz')

exports.index = async (req,res)=>{
    const user = await User.findSocial(req.user.id);
    res.json({ data:user });
}
exports.show = async (req,res)=>{
    res.json({ data:req.quiz });
}
exports.create = async (req,res)=>{
    const user = await User.findSocial(req.user.id);
     if(user==null){
        await User.create({
           social_user_id:req.user.id
        });
     }
    await Quiz.create({
        title: req.body.title,
        cover: req.body.cover,
        user_id: req.user.id
    });
    res.json({ message:"Prawidłowo utworzono !" });
}
exports.update = async (req,res)=>{
    await Quiz.update(req.params.quiz,{
       
    });
    res.json({ message:"Prawidłowo zaktualizowano !" });
}
exports.delete = async (req,res)=>{
    const quiz = await Grade.delete(req.params.quiz);
    res.json({ message:"Prawidłowo usunięto !",deleted:quiz });
}