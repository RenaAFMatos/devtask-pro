import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
      <main className="flex1 bg-gray-400 p-6 overflow-y-auto">
        <h1 className="text-2x1 font-bold mb-4">Dashboard</h1>
        <p>Welcome to the app layout!</p>
      </main>
      </div>
    </div>
  );
}

export default App;
