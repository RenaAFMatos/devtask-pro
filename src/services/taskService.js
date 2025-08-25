import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	deleteDoc
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

// Update a task with given updates
export const updateTask = async (taskId, updates) => {
	const taskRef = doc(db, "tasks", taskId);
	await updateDoc(taskRef, updates);
};

export const deleteTask = async (taskId) => {
	const taskRef = doc(db, "tasks", taskId)
	try{
		await deleteDoc(taskRef);
		console.log("✅ Task deleted successfully");
	}catch(err){
		console.error("❌ Error deleting task:", err);
		throw err;
	}
	
}