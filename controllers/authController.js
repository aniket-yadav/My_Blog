const jwt = require('jsonwebtoken');
const User = require('../models/user');

//handle errors

const handleErrors = (err) =>{

    let errors = {email:'',password:''};

    //email and password are empty
    if(err.message ==='Enter email and password'){
        errors.email = 'Please enter an email';
        errors.password = 'Please enter a password';
    }

    //email is empty
    if(err.message ==='Enter email'){
        errors.email = 'Please enter an email';
    }

     //password is empty
     if(err.message ==='Enter password'){
        errors.password = 'Please enter an password';
    }

    //invalid email
    if(err.message ==='invalid email'){
        errors.email ='Enter a valid email';
    }

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'Email does not exists';
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'Password is incorrect';
    }

    if(err._message == 'user validation failed'){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
            if(properties.type == 'unique'){
                if(properties.path =='email'){
                errors.email = 'Email is already registered';
            }
            }
        });
    }
   return errors;
}

const maxAge = 1*24*60*60;
const createToken = id =>{
    return jwt.sign({id},'keep bloging',{expiresIn:maxAge});

}


//signup 

const signup_post = async (req,res)=>{

    const {email,password} = req.body;

    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('loginToken',token,{htttpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}


const login_post = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
      
        res.cookie('loginToken',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
    const logout_get = (req,res)=>{
        res.cookie('loginToken','',{maxAge:1});
        res.redirect('/');
    }


module.exports = {
    login_post,
    signup_post,
    logout_get
}