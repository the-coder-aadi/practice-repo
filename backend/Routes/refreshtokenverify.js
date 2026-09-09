import express from "express"
import jwt from "jsonwebtoken"
import Refreshmiddleware from "./middleware/refreshcheckmiddleware.js"
const refreshtokencheck = express.Router()

refreshtokencheck.post("/refreshtokenverifictaion", Refreshmiddleware, (req,res)=>{
try {
    const newaccesstoken = jwt.sign(
        {id:req.user.id, name:req.user.name},
        process.env.ACCESS_KEY,
        {expiresIn:"30min"}
    )

      const newrefreshtoken = jwt.sign(
        {id:req.user.id, name:req.user.name},
        process.env.REFRESH_KEY,
        {expiresIn:"3d"}
    )

   res.cookie("Refresh_Token", newrefreshtoken,{
        httpOnly:true,
        sameSite:"strict",
        secure:true,
        maxAge: 3 * 24 * 60 * 60 * 1000
      })

      res.json({
        success:true,
        token:newaccesstoken
      })
} catch (error) {
       res.json({
        success:false,
       msg:"something went wrong in refresh token verification router"
      })
}
})
export default refreshtokencheck