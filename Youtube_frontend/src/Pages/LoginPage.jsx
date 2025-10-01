import axios from "axios";
import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4050/api/login", {
                email,
                password,
            });
            console.log(response.data);
            //handle storing token in header, in field authorization preceded by prefix BEARER

            // localStorage.setItem("token", response.data.token);
            // setError("");
            // window.location.href = "/"; // Redirect to home page after login
            // axios.defaults.headers.common['Authorization'] = `BEARER ${response.data.token}`;
  



            

        } catch (err) {
            setError(err.response.data.message);
        }
    };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          id="Login_email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="Login_password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
export default LoginPage;