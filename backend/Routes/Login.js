import express from "express"
import bcrypt from "bcrypt"
import usermodel from "../usermodel.js"
import jwt from "jsonwebtoken"
import upload from "./middleware/multer.js"

const LoginRouter = express.Router()

LoginRouter.post("/login", upload.single("img"), async(req,res)=>{
    try {
      console.log("req body:",req.body);
      
        const {email, password} = req.body
       
        console.log(password);
        
        const user = await usermodel.findOne({email})
        console.log(user);
        
      if (!user) {
        return res.json({
            success:false,
            msg:"user not found"
        })
      }
      const ismatch = await bcrypt.compare(password, user.password)
if (!ismatch) {
  return res.json({
    success:false,
    msg:"passowrd is invalid"
  })
}

await usermodel.create({
  name:"fsdfksd",
  email:"fake@gmail.com",
  password:"fjskdf42384",
  imageurl:req.file.path
})

      const AccessToken = jwt.sign(
        {id:user._id, name:user.name},
        process.env.ACCESS_KEY,
        {expiresIn:"30min"}
      )

        const RefreshToken = jwt.sign(
        {id:user._id, name:user.name},
        process.env.REFRESH_KEY,
        {expiresIn:"3d"}
      )

      res.cookie("Refresh_Token", RefreshToken,{
        httpOnly:true,
        sameSite:"strict",
        secure:true,
        maxAge: 3 * 24 * 60 * 60 * 1000
      })

      res.json({
        success:true,
        token:AccessToken,
        msg:"user login successfully"
      })
    } catch (error) {
        console.log(error);
        
        res.json({
            success:false,
            msg:"something went wrong"
        })
    }
})
export default LoginRouter