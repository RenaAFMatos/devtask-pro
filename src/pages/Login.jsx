import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log("Logged in user:", user);
            setEmail("");
            setPassword("");
            setError("");
            navigate("/home");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setError("Password or email are incorrect");
            } else {
                setError("Login failed: " + error.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-600 w-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-lg shadow-black w-full max-w-lg"
            >
                <h2 className="text-4xl font-bold mb-4 text-center text-blue-700">
                    Login
                </h2>
                <input
                    className="w-full mb-4 p-2 border rounded border-gray-700 focus:border-blue-500 focus:outline-none text-black"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full mb-4 p-2 border rounded border-gray-700 focus:border-blue-500 focus:outline-none text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button className="w-full bg-blue-600 text-white text-bold py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}
