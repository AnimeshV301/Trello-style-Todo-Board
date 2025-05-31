import React , {useState} from "react";
 const AddTodoModal = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [localError, setLocalError] = useState(''); 
    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');
        if (!title.trim()) {
            setLocalError('Task title cannot be empty.');
            return;
        }
        try {
            onSave({ title, description });
        } catch (err) {
            console.error("Error calling onSave from AddTodoModal:", err);
            setLocalError('An unexpected error occurred while saving.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all scale-100 opacity-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    {localError && (
                        <p className="text-red-500 text-sm mb-4">{localError}</p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            rows="3"
                            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTodoModal;