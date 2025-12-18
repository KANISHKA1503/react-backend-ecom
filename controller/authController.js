const User=require ("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY || "big_bang_theorey"
const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN || "1d"
const registerUser=async(req,res)=>
{
    try{
        const {email,password,name}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser)
        {
             res.status(400).json({error:"User already exists"})
             return
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({email,password:hashedPassword,name});
        res.status(201).json({message:"User created Successfully"})
    }catch(err)
    {
        res.status(400).json({error:err.message});
    }
}
const loginUser=async(req,res)=>
{
    try{
        const{email,password}=req.body
        const user=await User.findOne({email})
        if(!user)
           { res.status(400).json({error:"User not found"})
    return}
    const isPasswordCorrect=await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect)
    { res.status(400).json({error:"Invalid password"})
    return}
    const token=jwt.sign(
        {id:user._id,email:user.email},
        SECRET_KEY,
        {expiresIn:JWT_EXPIRES_IN}
    )
    res.status(200).json({message:"Login Successful",token})
    }catch(err)
    {
        res.status(400).json({error:err.message})
    }
}
module.exports= {registerUser,loginUser}