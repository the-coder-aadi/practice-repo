import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import Protected from "./Protected"
import ResetPassword from "./ResetPassword.jsx"
import ForgotPass from "./forgotpass"
function App() {
  const token = localStorage.getItem("Access_token")
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Protected><Home /></Protected>}/>
      <Route path="/" element={token ? <Navigate to="/home" /> : <Login />}/>
      <Route path="/register" element={<Register />}/>
       <Route path="/forgot-pass" element={<ForgotPass />}/>
          <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
    </Routes>
    </BrowserRouter>
  )
}
export default App
