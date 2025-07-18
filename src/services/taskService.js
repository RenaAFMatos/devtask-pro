import {collection, addDoc, getDocs, updateDoc, deleteDoc, query, where} from 'firebase/firestore';
import {db} from './firebase';

export const addTask = async (task) => {
    const docRef = await addDoc(collection(db, 'tasks'), task)
    return docRef.id;
}

export const getTasksForUser = async (userID) => {
    const q = query(collection(db, 'tasks'), where('userID', '==', userID))
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
}