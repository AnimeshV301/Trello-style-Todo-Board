import React from "react";
const TodoCard = React.memo(({ todo, setEditingTodo, setShowEditModal, setDeletingTodoId, setShowDeleteModal, onDragStartTodo }) => {
    return (
        <div
            draggable="true" 
            onDragStart={(e) => onDragStartTodo(e, todo.id)} 
            className={`
                bg-gray-50 p-4 mb-3 rounded-md shadow-md border border-gray-200
                transition-all duration-150 ease-in-out
                hover:shadow-lg hover:border-blue-300 cursor-grab
              border border-indigo-600 
            `}
        >
            <h3 className="font-semibold text-gray-800 text-lg mb-1">{todo.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{todo.description}</p>
            <div className="flex justify-end gap-2 text-sm">
                <button
                    onClick={() => {
                        setEditingTodo(todo);
                        setShowEditModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        setDeletingTodoId(todo.id); 
                        setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
});

export default TodoCard;