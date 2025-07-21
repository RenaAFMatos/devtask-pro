import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="h-screen flex flex-col w-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
      <main className="flex-1 bg-gray-400 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the app layout!</p>
        <TaskForm />
      </main>
      </div>
    </div>
  );
}

export default App;
