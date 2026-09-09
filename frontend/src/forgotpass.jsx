import { useState } from "react"

function ForgotPass() {
    const [email, setemail] = useState("")

    async function forgotpassword() {
        try {
            const api = await fetch("http://localhost:9000/forgotpass",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    email:email
                })
            })
            const res = await api.json()
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <div>
            <h1>Forgot Password</h1>
            <input type="email" placeholder="enter your email" value={email} onChange={(e)=> setemail(e.target.value)} />
            <button onClick={forgotpassword}>Submit</button>
        </div>
    )
}
export default ForgotPass