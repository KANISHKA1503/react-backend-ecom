const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token)
    {
        res.status(401).json({error:"unauthorized"})
        return
    }
    // const decoded=jwt.verify(token,process.env.SECRET_KEY)
    // console.log(decoded)
    try
   {     
    // const bearerToken=token.split(" ")[1]
    // const decoded=jwt.verify(bearerToken,process.env.SECRET_KEY)
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    console.log(decoded)
    req.userData={id:decoded.id,email:decoded.email}
    next()
      }
    catch(err)
    {
        res.status(401).json({error:"Unauthorized",message:err.message})
    }
}

module.exports = auth