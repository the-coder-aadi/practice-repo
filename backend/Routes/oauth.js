import express from "express"
import jwt from "jsonwebtoken"
const authrouter = express.Router()
import passport from "passport"
authrouter.get("/auth/google", passport.authenticate("google",
    {scope:["email", "profile"]}
))

authrouter.get("/auth/google/callback", passport.authenticate("google",{
session:false
}),(req,res)=>{
    const refreshtoken = jwt.sign(
        {id:req.user.id, name:req.user.name},
        process.env.REFRESH_KEY,
        {expiresIn:"3d"}
    )
    res.cookie("Refresh_Token", refreshtoken,{
        httpOnly:true,
        sameSite:"none",
        secure:true,
        maxAge:3 * 24 * 60 * 60 * 1000
    })
   res.redirect("https://practice-repo-1-2sxn.onrender.com/home")
})

export default authrouter

