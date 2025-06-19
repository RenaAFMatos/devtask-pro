import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        if (!email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("User registered:", user);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Registration error:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-600 w-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-lg shadow-black w-full max-w-lg"
            >
                <h2 className="text-4xl font-bold mb-4 text-center text-blue-700">
                    Register
                </h2>
                <label
                    htmlFor="email"
                    className="text-gray-700 text-xl font-semibold"
                >
                    Email:
                </label>
                <input
                    className="w-full mb-4 p-2 border rounded border-gray-700 focus:border-blue-500 focus:outline-none text-black"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label
                    htmlFor="password"
                    className="text-gray-700 text-xl font-semibold"
                >
                    Password:
                </label>
                <input
                    className="w-full mb-4 p-2 border rounded border-gray-700 focus:border-blue-500 focus:outline-none text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label
                    htmlFor="confirmPassword"
                    className="text-gray-700 text-xl font-semibold"
                >
                    Confirm Password:
                </label>
                <input
                    className="w-full mb-4 p-2 border rounded border-gray-700 focus:border-blue-500 focus:outline-none text-black"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
