import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { addTask } from "../services/taskService";
import { useAuth } from "../store/useAuthStore";
import {getTasksForUser} from "../services/taskService"

export default function TaskForm(){
    const {user} = useAuth();
    const [taskName, setTaskName] = useState("");

    // Return early if no user
    if (!user) {
        return <div>Please log in to add tasks</div>;
    }

    const newTask = {
        title:"",
        completed:false,
        createdDate: serverTimestamp(),
        userID: user.uid,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(!taskName) {
                throw new Error("Task name cannot be empty")
            } else {
                // Create task object with current taskName
                const taskToAdd = {
                    ...newTask,
                    title: taskName
                };
                
                await addTask(taskToAdd);
                console.log("Task added successfully");
                setTaskName(""); // Clear the input
            }
        }
        catch(error) {
            console.error("Error adding task:", error);
            alert("Failed to add task: " + error.message);
            return;
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg shadow-black w-full max-w-full">
                <div className="flex flex-row gap-2 items-center w-full">
                    <label htmlFor="taskName" className="flex-none text-black">Task Name:</label>
                    <input 
                        type="text" 
                        id="taskName" 
                        name="taskName" 
                        value={taskName} 
                        onChange={(e) => setTaskName(e.target.value)} 
                        className="bg-white text-black flex-1 border-b-2 focus:outline-none focus:ring-0"
                    />
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-2 rounded-lg flex-none">Add Task</button>
                </div>
            </form>
            <div className="shadow-lg shadow-black border-2 border-gray-300 rounded-lg p-4 mt-4">
                2121
            </div>
        </>
    )
}