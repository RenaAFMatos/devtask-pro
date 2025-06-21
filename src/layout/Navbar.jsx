import {useAuth} from '../store/useAuthStore.js';

export default function Navbar() {
    const {user, loading} = useAuth()

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <nav className="bg-blue-600 text-white px-4 py-3">
            <h1 className="text-xl font-bold">Devtask Pro</h1>
        </nav>
    );
}
