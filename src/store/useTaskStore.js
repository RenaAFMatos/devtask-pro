import { create } from "zustand";
import { getTasksForUser } from "../services/taskService";

export const useTaskStore = create((set) => ({
	tasks: [],

	// Fetch tasks from Firestore
	fetchTasks: async (userId) => {
		const tasks = await getTasksForUser(userId);
		set({ tasks });
	},

	// Add new task locally (optimistic update)
	addTaskLocally: (task) =>
		set((state) => ({
			tasks: [...state.tasks, task],
		})),

	// Toggle completed status locally
	toggleTask: (taskId, completed) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, completed } : task
			),
		})),

	// Remove task locally
	removeTask: (taskId) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== taskId),
		})),
}));
