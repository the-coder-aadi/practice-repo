import express from "express"
import jwt from "jsonwebtoken"
const accesstokenverify = express.Router()
accesstokenverify.post("/accesstokenverification", (req,res)=>{
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.json({
                success:false,
                msg:"access token not found"
            })
        }
        const verify = jwt.verify(token, process.env.ACCESS_KEY)
res.json({
    success:true,
    msg:"access token is valid"
})
    } catch (error) {
        res.json({
            success:false,
            msg:"access token invalid"
        })
    }
})
export default accesstokenverify