import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");


  const resetPassword = async () => {
  

    const response = await fetch(
      `https://practice-repo-xbt2.onrender.com/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Password reset successfully");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button onClick={resetPassword}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;