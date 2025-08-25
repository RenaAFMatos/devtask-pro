import { useState } from "react";

export default function EditTaskModal({ task, onClose, onUpdate }) {
    const [title, setTitle] = useState(task.title);

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Task title cannot be empty");
            return;
        }

        try {
            await onUpdate(task.id, { title: title.trim()});
            onClose();
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl shadow-black w-2/3 h-2/3 flex flex-col">
                <h2 className="text-3xl font-semibold text-blue-600 mb-4">Edit Task</h2>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-black w-full p-2 rounded mb-4 flex-1 text-black align-top resize-none focus:outline-none"
                />
                <div className="flex flex-row justify-end gap-2">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded text-black font-semibold hover:bg-gray-400 hover:cursor-pointer transition-colors duration-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 hover:cursor-pointer transition-colors duration-300"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
