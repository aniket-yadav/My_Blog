const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"minimum password length is 6 character"]
    }
});

userSchema.plugin(uniqueValidator);

//hash password pre save
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//login function

userSchema.statics.login = async function(email,password){

    if(!validator.isEmail(email)){
        throw Error('invalid email');
    }
    if(email=='' && password==''){
        throw Error('Enter email and password');
    }
    if(email == ''){
        throw Error('Enter email');
    }
    if(password == ''){
        throw Error('Enter password');
    }

    const user = await this.findOne({email});
    if(user){

        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');

}

const User = mongoose.model("user",userSchema);

module.exports = User;
