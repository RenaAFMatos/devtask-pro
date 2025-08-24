import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { addTask } from "../services/taskService";
import { useAuth } from "../store/useAuthStore";
import { useTaskStore } from "../store/useTaskStore";
import TaskList from "./TaskList.jsx";

export default function TaskForm() {
  const { user } = useAuth();
  const { addTaskLocally } = useTaskStore();
  const [taskName, setTaskName] = useState("");

  if (!user) {
    return <div>Please log in to add tasks</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      alert("Task name cannot be empty");
      return;
    }

    const taskToAdd = {
      title: taskName,
      completed: false,
      createdDate: serverTimestamp(),
      userId: user.uid
    };

    try {
      // Firestore save
      const taskId = await addTask(taskToAdd);

      // Add task locally with Firestore ID
      addTaskLocally({ id: taskId, ...taskToAdd });

      console.log("✅ Task added successfully");
      setTaskName(""); // Clear input
    } catch (error) {
      console.error("❌ Error adding task:", error);
      alert("Failed to add task: " + error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg shadow-black w-full max-w-full"
      >
        <div className="flex flex-row gap-2 items-center w-full">
          <label htmlFor="taskName" className="flex-none text-black">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="bg-white text-black flex-1 border-b-2 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-2 rounded-lg flex-none"
          >
            Add Task
          </button>
        </div>
      </form>
      <TaskList />
    </>
  );
}
