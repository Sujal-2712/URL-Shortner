const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    shortURL:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'url'
    }],
})

userSchema.methods.generateAuthToken= async function()
{
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        return token;
    } catch (error) {
        console.log("error");
    }
}

const user=mongoose.model('user',userSchema);

module.exports=user;