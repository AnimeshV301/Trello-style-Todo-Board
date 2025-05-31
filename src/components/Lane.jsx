import React from "react";
import TodoCard from "./TodoCard";
const Lane = React.memo(({ id, title, todos, setEditingTodo, setShowEditModal, setDeletingTodoId, setShowDeleteModal, onDropTodo, onDragOver, onDragStartTodo }) => {
    return (
        <div
            id={id} 
            onDrop={(e) => onDropTodo(e, id)} 
            onDragOver={onDragOver} 
            style={{height:'250vh'}}
            className={`
                flex-shrink-0 w-full  md:w-80 p-4 rounded-lg shadow-xl
                bg-white border-2 border-black-600
                transition-colors duration-200 ease-in-out
                border-t-4 ${id === 'pending' ? 'border-blue-500' : id === 'in-progress' ? 'border-yellow-500' : 'border-green-500'}
            `}
        >
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">{title} ({todos.length})</h2>
            <div className="min-h-[100px]">
                {todos.length === 0 && (
                    <p className="text-gray-500 text-center italic">No tasks here yet!</p>
                )}
                {todos.map((todo) => (
                    <TodoCard
                        key={todo.firestoreId} 
                        todo={todo}
                        setEditingTodo={setEditingTodo}
                        setShowEditModal={setShowEditModal}
                        setDeletingTodoId={setDeletingTodoId}
                        setShowDeleteModal={setShowDeleteModal}
                        onDragStartTodo={onDragStartTodo}
                    />
                ))}
            </div>
        </div>
    );
});

export default Lane;