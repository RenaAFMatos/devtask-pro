import UserMenu from "../components/UserMenu";

export default function Sidebar() {
    return (
        <aside className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <ul className="space-y-2">
                <li>All tasks</li>
                <li>Today</li>
                <li>Completed</li>
            </ul>
            <UserMenu />
        </aside>
    );
}
