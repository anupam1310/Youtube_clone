import axios from "axios";
import { useState } from "react";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4050/api/register", {
                username: name,
                email: email,
                password: password,
                avatar_url: avatar,
            });
            console.log(response.data);
            // Handle successful registration (e.g., redirect to login page)
        } catch (err) {
            setError(err.response.data.message);
            // console.log(err.response.data.error);
            
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="avatar">Avatar URL:</label>
                <input
                    id="avatar"
                    type="text"
                    placeholder="AVATAR URL"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    
                />
                <button type="submit">Register</button>
            </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
export default RegisterPage;