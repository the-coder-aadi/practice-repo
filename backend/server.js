import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import ConnectDB from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import usermodel from "./usermodel.js"
import cookieParser from "cookie-parser";
import Registerrouter from "./Routes/register.js"
import LoginRouter from "./Routes/Login.js"
import accesstokenverify from "./Routes/accesstokenverify.js"
import refreshtokencheck from "./Routes/refreshtokenverify.js"
import Forgotpassrouter from "./Routes/forgotpass.js"
import "./Routes/middleware/passport.js"
import passport from "passport"
import "./Routes/middleware/passport.js"
import Resetpassrouter from "./Routes/Resetpassword.js"
import authrouter from "./Routes/oauth.js"


const server = express()
server.use(express.json())
server.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
server.use(cookieParser())

ConnectDB()
server.use(passport.initialize())
server.use("/", Registerrouter)
server.use("/", authrouter)
server.use("/", LoginRouter)
server.use("/", accesstokenverify)
server.use("/", refreshtokencheck)
server.use("/", Forgotpassrouter)
server.use("/", Resetpassrouter)

const PORT = process.env.PORT || 9000;

server.listen(PORT, "0.0.0.0", ()=>{
    console.log(`server listening on ${PORT} port`);
});