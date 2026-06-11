import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      alert(res.data.message);

      // Save logged-in user info
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/trainee");
      }
    } catch (error) {
      alert("Login Failed");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Allotment System</h1>

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

        <br />
        <br />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;