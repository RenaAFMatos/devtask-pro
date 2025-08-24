import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { db } from "./firebase";

const tasksRef = collection(db, "tasks");

// Add a new task
export const addTask = async (task) => {
	const docRef = await addDoc(tasksRef, task);
	return docRef.id; // return Firestore doc ID
};

// Fetch tasks for a specific user
export const getTasksForUser = async (userId) => {
	const q = query(
		tasksRef,
		where("userId", "==", userId),
		where("completed", "==", false)
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));
};

// Update a task's completed status
export const updateTaskStatus = async (taskId, completed) => {
	const taskRef = doc(db, "tasks", taskId);

	// Use setDoc with merge to create or update the document
	await setDoc(taskRef, { completed }, { merge: true });
};
