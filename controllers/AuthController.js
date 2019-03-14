const axios = require("axios");
const user = require('../models/User');
axios.defaults.baseURL = "https://id.socialler.eu/api";
exports.login = async (req,res)=>{
   axios.post('auth/login',{email:req.body.email,password:req.body.password}).then((response)=>{
      res.json({data:{access_token:response.data.access_token,message:"Zostałeś prawidłowo zautoryzowany z Social ID !"}});
   }).catch((error)=>{
      res.json({message:"Błąd podczas logowania !"});
   });
}
exports.me = async (req,res)=>{
   res.json({data:req.user});
}
exports.auth = async (req,res,next)=>{
   axios.defaults.headers.common['Authorization'] = 'Bearer' + req.headers.authorization;
   axios.post('auth/me').then((response)=>{
      req.user = response.data;
      next();
   }).catch((error)=>{
      res.json({message:"Jesteś niezautoryzowanym użytkownikiem !"});
   });
}
exports.logout = async (req,res)=>{
   axios.post('auth/logout');
   res.json({message:"Prawidłowo wylogowano !"});
}