import express from "express"
import usermodel from "../usermodel.js"
import crypto from "crypto"
import transporter from "./transport.js"
const Forgotpassrouter = express.Router()

Forgotpassrouter.post("/forgotpass", async(req,res)=>{
    try {
        const {email} = req.body
        const user = await usermodel.findOne({email})
        if (!user) {
            return res.json({
                success:false,
                msg:"user not found"
            })
        }

        const resettoken = crypto.randomBytes(32).toString("hex")
const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

user.resetToken = resettoken
user.resetTokenExpiry = resetTokenExpiry

await user.save()

    const resetLink = `https://practice-repo-1-2sxn.onrender.com/reset-password/${resettoken}`;

    await transporter.sendMail({
          from: process.env.gmail,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested to reset your password.</p>
        <p>Click the button below to create a new password:</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>
      `
    })

    res.json({
        success:true,
        msg:"reset link sent to your email"
    })

    } catch (error) {
        res.json({
            success:false,
            msg:"something went wrong"
        })
    }
})

export default Forgotpassrouter
