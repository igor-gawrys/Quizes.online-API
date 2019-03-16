const Mail = require('../models/Mail')
exports.create = async (req,res)=>{
    await Mail.create({
        name:req.body.name,
        email:req.body.email,
        grade_id:req.body.grade_id
    });
    res.json({message:"Prawidłowo utworzono !"});
}
exports.delete = async (req,res)=>{
    const mail = await Mail.delete(req.params.mail);
    res.json({message:"Prawidłowo usunięto !",deleted:mail});
}