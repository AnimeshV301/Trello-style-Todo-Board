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

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);

  // Ref to store the ID of the currently dragged todo
  const draggedTodoId = useRef(null);
  // Ref to simulate unique IDs for new todos (since DummyJSON doesn't persist new ones)
  const nextTodoId = useRef(200); // Start after DummyJSON's typical max ID

  // Fetch todos from DummyJSON API
  useEffect(() => {
    const fetchInitialTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/todos?limit=15"); // Fetch a few more todos
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const fetchedTodos = data.todos.map((todo) => ({
          id: todo.id, // Use DummyJSON's ID
          title: todo.todo,
          description: `A task fetched from DummyJSON.`, // Add a dummy description
          completed: todo.completed,
          status: todo.completed ? "completed" : "pending", // Map DummyJSON 'completed' to our 'status'
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
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle drag start
  const handleDragStart = useCallback((e, todoId) => {
    console.log("Drag started for todo ID:", todoId);
    draggedTodoId.current = todoId;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", todoId.toString()); // Ensure ID is a string
  }, []);

  // Function to handle drop
  const handleDrop = useCallback(
    async (e, newLaneId) => {
      e.preventDefault(); // Prevent default to allow drop
      // Retrieve the ID using dataTransfer.getData and parse it back to a number
      const droppedTodoId = parseInt(e.dataTransfer.getData("text/plain"));
      console.log("Dropped todo ID:", droppedTodoId, "into lane:", newLaneId);

      if (isNaN(droppedTodoId)) {
        console.error("Invalid todo ID received during drop.");
        return;
      }

      // Find the todo in the current state
      const draggedTodo = todos.find((todo) => todo.id === droppedTodoId);
      if (!draggedTodo) {
        console.error("Dragged todo not found in state:", droppedTodoId);
        return;
      }

      let newStatus = newLaneId;
      let newCompleted = draggedTodo.completed;

      if (newStatus === "completed") {
        newCompleted = true;
      } else {
        newCompleted = false;
      }

      // Update the todo in local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === draggedTodo.id
            ? { ...todo, status: newStatus, completed: newCompleted }
            : todo
        )
      );

      // Simulate API call for status update (DummyJSON doesn't persist this)
      console.log(
        `Simulating API call to update todo ${draggedTodo.id} status to ${newStatus}`
      );
      // In a real app, you'd make a PUT request here:
      /*
      try {
          const response = await fetch(`https://dummyjson.com/todos/${draggedTodo.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ completed: newCompleted, status: newStatus }) // DummyJSON only accepts 'completed'
          });
          if (!response.ok) throw new Error('Failed to update todo on DummyJSON');
          console.log('Status update simulated successfully.');
      } catch (err) {
          console.error('Simulated API update failed:', err);
          setError('Failed to update todo status (simulated).');
          // Revert state if update fails, or handle error
      }
      */

      draggedTodoId.current = null; // Reset the dragged todo ID
    },
    [todos]
  );

  // Function to handle drag over
  const handleDragOver = useCallback((e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
    // console.log("Drag over:", e.target.id); // Can be noisy, use sparingly
  }, []);

  // Function to add a new todo (simulated locally)
  const addTodo = useCallback(async (newTodoData) => {
    setLoading(true);
    try {
      console.log(
        "AddTodo: Attempting to add new todo with data:",
        newTodoData
      );
      const tempId = nextTodoId.current++; // Generate a unique ID for the session
      const newTodo = {
        id: tempId,
        title: newTodoData.title,
        description: newTodoData.description || "", // Ensure description is always a string
        completed: false,
        status: "pending",
      };

      // Simulate API call for adding (DummyJSON doesn't persist new todos)
      console.log("AddTodo: Simulating API call to add new todo:", newTodo);
      // In a real app, you'd make a POST request here:
      /*
          const response = await fetch('https://dummyjson.com/todos/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ todo: newTodo.title, completed: newTodo.completed, userId: 1 }) // DummyJSON requires userId
          });
          if (!response.ok) throw new Error('Failed to add todo on DummyJSON');
          const addedTodo = await response.json();
          // Use addedTodo.id if DummyJSON returned a real ID, otherwise use tempId
          */

      // Add to local state at the beginning of the array
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      console.log("AddTodo: Todo added to local state. Closing modal.");
      setShowAddModal(false);
    } catch (e) {
      console.error("Error adding todo (simulated):", e);
      setError("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to update an existing todo (simulated locally)
  const updateTodo = useCallback(async (updatedTodoData) => {
    setLoading(true);
    try {
      // Simulate API call for updating (DummyJSON doesn't persist these changes either)
      console.log("Simulating API call to update todo:", updatedTodoData);
      // In a real app, you'd make a PUT request here:
      /*
          const response = await fetch(`https://dummyjson.com/todos/${updatedTodoData.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ todo: updatedTodoData.title }) // DummyJSON only accepts 'todo' for title
          });
          if (!response.ok) throw new Error('Failed to update todo on DummyJSON');
          */

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodoData.id
            ? {
                ...todo,
                title: updatedTodoData.title,
                description: updatedTodoData.description,
              }
            : todo
        )
      );
      setShowEditModal(false);
      setEditingTodo(null);
    } catch (e) {
      console.error("Error updating todo (simulated):", e);
      setError("Failed to update todo. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTodo = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Simulating API call to delete todo ID:", deletingTodoId);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deletingTodoId)
      );
      setShowDeleteModal(false);
      setDeletingTodoId(null);
    } catch (e) {
      console.error("Error deleting todo (simulated):", e);
      setError("Failed to delete todo. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [deletingTodoId]);

  const pendingTodos = useMemo(
    () => todos.filter((todo) => todo.status === "pending"),
    [todos]
  );
  const inProgressTodos = useMemo(
    () => todos.filter((todo) => todo.status === "in-progress"),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.status === "completed"),
    [todos]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">
          Loading your board...
        </div>
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
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          {" "}
          Todo Board
        </h1>
        <p className="text-gray-600">
          Drag and drop tasks between lanes to manage your workflow.
        </p>
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
      {showAddModal && (
        <AddTodoModal onClose={() => setShowAddModal(false)} onSave={addTodo} />
      )}
      {showEditModal && editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={() => {
            setShowEditModal(false);
            setEditingTodo(null);
          }}
          onSave={updateTodo}
        />
      )}
      {showDeleteModal && deletingTodoId && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingTodoId(null);
          }}
          onConfirm={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
