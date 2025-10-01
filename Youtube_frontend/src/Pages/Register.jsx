import axios from "axios";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";


function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4050/api/register", {
                fullname: name,
                email: email,
                password: password,
                avatar_url: avatar,
            });
            console.log(response.data);
            setError("");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError(err.response.data.message);
            // console.log(err.response.data.error);
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                            Avatar URL
                        </label>
                        <input
                            id="avatar"
                            type="text"
                            placeholder="Avatar URL"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-gray-600 text-sm">Already registered? </span>
                        <Link to="/login" className="text-blue-600 hover:underline text-sm">Go to Login Page</Link>
                    </div>
                </form>
                {error && (
                    <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
                )}
            </div>
        </div>
    );
}
export default RegisterPage;