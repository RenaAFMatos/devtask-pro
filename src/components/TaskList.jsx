import { useEffect, useState } from "react";
import { getTasksForUser } from "../services/taskService";
import { useAuth } from "../store/useAuthStore";
import {motion} from "framer-motion";

export default function TaskList() {1
    const { user } = useAuth();
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            if (!user) return;
            const userTasks = await getTasksForUser(user.uid)
            setTasks(userTasks);
        }
        fetchTasks();
    }, [user]);
    

    return(
        <div className="mt-6 space-y-3">
            {tasks.map((task) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}  // Start invisible + slightly below
                    animate={{ opacity: 1, y:0 }}   // Fade in + move up
                    transition={{ duration: 0.4 }}   // Smooth animation
                    className="p-4 border rounded-xl bg-white text-black hover:bg-zinc-300 transition-colors duration-300 flex items-center"
                >
                    <input
                        type="checkbox"
                        className="appearance-none mr-2 border-2 border-black h-4 w-4 rounded bg-white checked:bg-blue-600 focus:outline-none transition duration-200 cursor-pointer after:content-['✓'] after:flex after:items-center after:justify-center after:w-full after:h-full after:text-white after:text-xl after:font-bold after:opacity-0 checked:after:opacity-100"
                    />
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                </motion.div>
            ))}
        </div>

        )
    }