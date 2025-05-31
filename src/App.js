import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Lane from "./components/Lane";
import AddTodoModal from "./components/AddTodoModal";
import EditTodoModal from "./components/EditTodoModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);

  const draggedTodoId = useRef(null);
  const nextTodoId = useRef(200); 

  useEffect(() => {
      const fetchInitialTodos = async () => {
          try {
              setLoading(true);
              const response = await fetch('https://dummyjson.com/todos?limit=15'); 
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              const fetchedTodos = data.todos.map(todo => ({
                  id: todo.id, 
                  title: todo.todo,
                  description: `A task fetched from DummyJSON.`, 
                  completed: todo.completed,
                  status: todo.completed ? 'completed' : 'pending' 
              }));
              setTodos(fetchedTodos);
          } catch (err) {
              console.error("Error fetching todos from DummyJSON:", err);
              setError("Failed to load todos from DummyJSON. Please try again.");
          } finally {
              setLoading(false);
          }
      };

      fetchInitialTodos();
  }, []); 
  const handleDragStart = useCallback((e, todoId) => {
      console.log("Drag started for todo ID:", todoId);
      draggedTodoId.current = todoId;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", todoId.toString()); 
  }, []);

  const handleDrop = useCallback(async (e, newLaneId) => {
      e.preventDefault(); 
      const droppedTodoId = parseInt(e.dataTransfer.getData("text/plain"));
      console.log("Dropped todo ID:", droppedTodoId, "into lane:", newLaneId);

      if (isNaN(droppedTodoId)) {
          console.error("Invalid todo ID received during drop.");
          return;
      }

      const draggedTodo = todos.find(todo => todo.id === droppedTodoId);
      if (!draggedTodo) {
          console.error("Dragged todo not found in state:", droppedTodoId);
          return;
      }

      let newStatus = newLaneId;
      let newCompleted = draggedTodo.completed;

      if (newStatus === 'completed') {
          newCompleted = true;
      } else {
          newCompleted = false;
      }

      setTodos(prevTodos =>
          prevTodos.map(todo =>
              todo.id === draggedTodo.id
                  ? { ...todo, status: newStatus, completed: newCompleted }
                  : todo
          )
      );

      console.log(`Simulating API call to update todo ${draggedTodo.id} status to ${newStatus}`);
     

      draggedTodoId.current = null; 
  }, [todos]);

  const handleDragOver = useCallback((e) => {
      e.preventDefault(); 
      e.dataTransfer.dropEffect = "move";
  }, []);

  const addTodo = useCallback(async (newTodoData) => {
      setLoading(true);
      try {
          console.log("AddTodo: Attempting to add new todo with data:", newTodoData);
          const tempId = nextTodoId.current++; 
          const newTodo = {
              id: tempId,
              title: newTodoData.title,
              description: newTodoData.description || '', 
              completed: false,
              status: 'pending'
          };

          console.log("AddTodo: Simulating API call to add new todo:", newTodo);
          const response = await fetch('https://dummyjson.com/todos/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ todo: newTodo.title, completed: newTodo.completed, userId: 1 }) // DummyJSON requires userId
          });
          if (!response.ok) throw new Error('Failed to add todo on DummyJSON');
          const addedTodo = await response.json();

          setTodos(prevTodos => [newTodo, ...prevTodos]);
          console.log("AddTodo: Todo added to local state. Closing modal.");
          setShowAddModal(false);
      } catch (e) {
          console.error("Error adding todo (simulated):", e);
          setError("Failed to add todo. Please try again.");
      } finally {
          setLoading(false);
      }
  }, []);

  const updateTodo = useCallback(async (updatedTodoData) => {
      setLoading(true);
      try {
          console.log("Simulating API call to update todo:", updatedTodoData);

          setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletingTodoId));
          setShowDeleteModal(false);
          setDeletingTodoId(null);
      } catch (e) {
          console.error("Error deleting todo (simulated):", e);
          setError("Failed to delete todo. Please try again.");
      } finally {
          setLoading(false);
      }
  }, [deletingTodoId]);
  const deleteTodo = useCallback(async () => {
    setLoading(true);
    try {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletingTodoId));
        setShowDeleteModal(false);
        setDeletingTodoId(null);
    } catch (e) {
        console.error("Error deleting todo (simulated):", e);
        setError("Failed to delete todo. Please try again.");
    } finally {
        setLoading(false);
    }
}, [deletingTodoId]);
  const pendingTodos = useMemo(() => todos.filter(todo => todo.status === 'pending'), [todos]);
  const inProgressTodos = useMemo(() => todos.filter(todo => todo.status === 'in-progress'), [todos]);
  const completedTodos = useMemo(() => todos.filter(todo => todo.status === 'completed'), [todos]);

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="text-lg font-semibold text-gray-700">Loading your board...</div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
          </div>
      );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
          <header className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Trello-style Todo Board</h1>
              <p className="text-gray-600">Drag and drop tasks between lanes to manage your workflow.</p>
          </header>

          <div className="flex justify-center mb-6">
              <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                  + Add New Task
              </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
              <Lane
                  id="pending"
                  title="Pending"
                  todos={pendingTodos}
                  setEditingTodo={setEditingTodo}
                  setShowEditModal={setShowEditModal}
                  setDeletingTodoId={setDeletingTodoId}
                  setShowDeleteModal={setShowDeleteModal}
                  onDropTodo={handleDrop}
                  onDragOver={handleDragOver}
                  onDragStartTodo={handleDragStart}
              />
              <Lane
                  id="in-progress"
                  title="In Progress"
                  todos={inProgressTodos}
                  setEditingTodo={setEditingTodo}
                  setShowEditModal={setShowEditModal}
                  setDeletingTodoId={setDeletingTodoId}
                  setShowDeleteModal={setShowDeleteModal}
                  onDropTodo={handleDrop}
                  onDragOver={handleDragOver}
                  onDragStartTodo={handleDragStart}
              />
              <Lane
                  id="completed"
                  title="Completed"
                  todos={completedTodos}
                  setEditingTodo={setEditingTodo}
                  setShowEditModal={setShowEditModal}
                  setDeletingTodoId={setDeletingTodoId}
                  setShowDeleteModal={setShowDeleteModal}
                  onDropTodo={handleDrop}
                  onDragOver={handleDragOver}
                  onDragStartTodo={handleDragStart}
              />
          </div>

          {/* Modals */}
          {showAddModal && <AddTodoModal onClose={() => setShowAddModal(false)} onSave={addTodo} />}
          {showEditModal && editingTodo && <EditTodoModal todo={editingTodo} onClose={() => { setShowEditModal(false); setEditingTodo(null); }} onSave={updateTodo} />}
          {showDeleteModal && deletingTodoId && <DeleteConfirmationModal onClose={() => { setShowDeleteModal(false); setDeletingTodoId(null); }} onConfirm={deleteTodo} />}
      </div>
  );
}

export default App;
