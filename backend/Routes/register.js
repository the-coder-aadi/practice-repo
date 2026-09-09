import express from "express"
const Registerrouter = express.Router()
import usermodel from "../usermodel.js"
import bcrypt from "bcrypt"

Registerrouter.post("/register", async(req,res)=>{
    try {
        const {name, email, password} = req.body
        const hashedpass = await bcrypt.hash(password, 10)
        const user = await usermodel.create({
            name:name,
            email:email,
            password:hashedpass
        })

        res.json({
            successa:true,
            msg:"user created successfully"
        })
        
    } catch (error) {
        console.log(error);
        
           res.json({
            successa:false,
            msg:"user creation faild"
        })
     
        
    }
})
export default Registerrouter
