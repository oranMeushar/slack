const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:true,
}

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: [true, 'Name is required'],
        minlength:[2, 'Name must be at least 2 characters'],
        maxLength:[30, 'Name must be at most 30 characters']
    },
    email:{
        type:'string',
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        maxLength:[50, 'Email must be at most 50 characters'],
        validate:[isValidEmail, 'Invalid Email']
    },
    password:{
        type:'string',
        required: [true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 characters'],
        maxLength:[50, 'Password must be at most 50 characters']
    },
    passwordConfirm:{
        type:'string',
        required: [true, 'Password is required'],
        minlength:[6, 'Password confirmation must be at least 6 characters'],
        maxLength:[50, 'Password confirmation must be at most 50 characters'],
        validate:[isValidPassword, 'Invalid Password']
    }, 
    friends:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ]
}, options);


function isValidEmail(email){
    return validator.isEmail(email);
}

function isValidPassword(passwordConfirm){
    return this.password === passwordConfirm;
}


userSchema.methods = {
    isPassword: async function(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword)
    }
};


userSchema.pre('save', async function(next){ 
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        this.passwordConfirm = undefined;
    }
    next();
});

userSchema.pre('validate', function(next){ 
    this.name = validator.trim(this.name);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;