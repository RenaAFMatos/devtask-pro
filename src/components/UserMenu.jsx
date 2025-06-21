import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function UserMenu() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                Logout
            </button>
        </div>
    );
}
