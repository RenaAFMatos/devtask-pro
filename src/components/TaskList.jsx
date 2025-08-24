import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { updateTaskStatus } from "../services/taskService";
import { useAuth } from "../store/useAuthStore";
import { useTaskStore } from "../store/useTaskStore";
import EditTaskModal from "./EditTaskModal";

export default function TaskList() {
    const { user } = useAuth();
    const { tasks, fetchTasks, toggleTask, removeTask } = useTaskStore();
    const [isEditModalOpen, setIsEdtitModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        if (user) {
            fetchTasks(user.uid);
        }
    }, [user, fetchTasks]);

    const handleEditClick = (task) => {
        setTaskToEdit(task);
        setIsEdtitModalOpen(true);
    }
    
    const handleToggle = async (taskId, currentStatus) => {
        const updatedStatus = !currentStatus;

        // Optimistic UI update locally for strike-through
        toggleTask(taskId, updatedStatus);

        try {
            // Update Firestore
            await updateTaskStatus(taskId, updatedStatus);
            console.log("✅ Firestore updated successfully");

            // If task is completed, remove it after animation
            if (updatedStatus) {
                setTimeout(() => {
                    removeTask(taskId);
                }, 300); // allow strike-through animation
            }
        } catch (err) {
            console.error("❌ Firestore update failed:", err);

            // Revert local state if update fails
            toggleTask(taskId, currentStatus);
        }
    };


    const taskVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <>
            <div className="mt-6 space-y-3">
            <AnimatePresence>
                {tasks.map((task) => (
                <motion.div
                    key={task.id}
                    variants={taskVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="p-4 border rounded-xl bg-white text-black hover:bg-zinc-300 transition-colors duration-300 flex items-center relative"
                >
                    <input
                        type="checkbox"
                        className="appearance-none mr-2 border-2 border-black h-4 w-4 rounded bg-white checked:bg-blue-600 focus:outline-none transition duration-200 cursor-pointer after:content-['✓'] after:flex after:items-center after:justify-center after:w-full after:h-full after:text-white after:text-xl after:font-bold after:opacity-0 checked:after:opacity-100"
                        checked={task.completed}
                        onChange={() => handleToggle(task.id, task.completed)}
                    />
                    <h3 className="text-lg font-semibold relative flex-1">
                    {task.title}
                    {/* Strike-through line */}
                    <motion.span
                        className="absolute left-0 top-1/2 h-[2px] bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: task.completed ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    </h3>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg  hover:bg-yellow-600 hover:cursor-pointer transition-colors duration-300" onClick={()=> handleEditClick(task)}>Edit</button>
                </motion.div>
                ))}
            </AnimatePresence>
            </div>

            {isEditModalOpen && (
                <EditTaskModal task={taskToEdit} onClose={() => setIsEdtitModalOpen(false)}/>
        )}
        </>
    );
}
