import express from "express"
import usermodel from "../usermodel.js"
import bcrypt from "bcrypt"
const Resetpassrouter = express.Router()

Resetpassrouter.post("/reset-password/:token", async(req,res)=>{
    try {
        const {token} = req.params
        const {password} = req.body

           const user = await usermodel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({
        success: false,
        msg: "Invalid or expired reset link"
      });
    }

    const hashed = await bcrypt.hash(password, 10)

    user.password = hashed
    
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save()

     res.json({
      success: true,
      msg: "Password reset successfully"
    });

    } catch (error) {
         res.json({
      success: false,
      msg: "something went wrong in password reset"
    });
    }
})
export default Resetpassrouter