import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function UserMenu() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out");
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
