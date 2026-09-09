import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
function Protected({children}) {
const [isauth, setisauth] = useState(false)
const [loading, setloading] = useState(true)

useEffect(()=>{
accesstokenverification()
},[])

async function accesstokenverification() {
 try {
    console.log("access token verification request...");
    const Accesstoken = localStorage.getItem("Access_token")
    if (!Accesstoken) {
        return refreshtokenverifictaion()
    }

    const api = await fetch("http://localhost:9000/accesstokenverification",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "authorization": Accesstoken
        }
    })

    const res = await api.json()
    console.log(res);
    if (res.success) {
        console.log("access token verify successfully...");
        
        setisauth(true)
        setloading(false)
        return
    }
    else{
        console.log("access token verify failed...");
        localStorage.removeItem("Access_token")
        return refreshtokenverifictaion()
    }


 } catch (error) {
    console.log(error, "error");
    
 }   
}

async function refreshtokenverifictaion() {
    console.log("refresh token verification request...");
    
    try {
        const api = await fetch("http://localhost:9000/refreshtokenverifictaion",{
            method:"POST",
            credentials:"include"
        })

        const res = await api.json()
        console.log(res);

        if (res.success) {
            console.log("refresh token verification success...");
            
            localStorage.setItem("Access_token", res.token)
            accesstokenverification()
            return;
        }
        else{
             console.log("refresh token verification failed...");
            setisauth(false)
            setloading(false)
            return
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

if (loading) {
    return "loading...."
}
if (!isauth) {
    return <Navigate to="/" />
}

return children

}

export default Protected