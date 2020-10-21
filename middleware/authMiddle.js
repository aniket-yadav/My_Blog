const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.loginToken;
    
    //check jsonwebtoken exists and is verifield

    if(token){
        jwt.verify(token,'keep bloging',(err,decordedToken)=>{

            if(err){
                res.redirect('/login'); 
            }else{
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

//check user 

const checkUser = (req,res,next)=>{
    const token = req.cookies.loginToken;
     //check jsonwebtoken exists and is verifield

     if(token){
        jwt.verify(token,'keep bloging', async (err,decordedToken)=>{

            if(err){
                res.redirect('/login');
            }else{
                let user = await User.findById(decordedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
};

module.exports = {requireAuth,checkUser};
