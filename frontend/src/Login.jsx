import { useState } from "react";
// import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setfile] = useState(null)
 
const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    const formdata = new FormData()
formdata.append("email", email)
formdata.append("password", password)
formdata.append("img", file)
    try {
      const response = await fetch("https://practice-repo-xbt2.onrender.com/login", {
        method: "POST",
    // headers:{
    //   "Content-Type":"application/json"
    // },
       credentials:"include",

       body: formdata

      });

   

      const data = await response.json();

      if (data.success) {
        console.log("Login successful");
        // console.log("Access Token:", data.accessToken);
            console.log(data);
            localStorage.setItem("Access_token", data.token)
console.log("login complete go to home...");

       navigate("/home")
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>Welcome back! Please login to continue.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

<input
  type="file"
  accept="image/*"
  onChange={(e) => setfile(e.target.files[0])}
/>

<button onClick={()=> navigate("/forgot-pass")}>Forgot Password</button>
    

          <button type="submit">Login</button>
        </form>
         <p className="para" onClick={()=> navigate("/register")}>Account Create</p>
          <button
  onClick={() => {
window.location.href = "https://practice-repo-xbt2.onrender.com/auth/google";
  }}
>
  Continue with Google
</button>
      </div>
     
    </div>
  );
}

export default Login;