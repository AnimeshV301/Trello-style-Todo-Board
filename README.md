Approach Taken & Design Decisions
The application is built using React, following a component-based architecture for modularity and reusability.

Component-Based Architecture:
App.js: The main application component, responsible for fetching data, managing the global state of todos, and orchestrating interactions between different parts of the application. It also handles the modal visibility and the core drag-and-drop logic.
Lane Component: Represents a single column (e.g., "Pending", "In Progress", "Completed"). It receives the list of todos relevant to its status and handles drag-and-drop events for its area.
TodoCard Component: Displays an individual task. It's draggable and contains actions like "Edit" and "Delete".
Modal Components (AddTodoModal, EditTodoModal, DeleteConfirmationModal): Separate components for user interactions that require overlays, ensuring a clean separation of concerns and reusable UI.

4. State Management
useState
For managing todos, modal visibility, and currently edited todo.

useRef
For draggedTodoId and nextTodoId to maintain mutable values without triggering re-renders.

5. Styling
Tailwind CSS is used throughout for utility-first styling.
This promotes:

Rapid UI development

Consistency in design

Mobile responsiveness without custom CSS

6. Drag and Drop Implementation
Custom HTML5 Drag-and-Drop API used due to environment constraints.

Logic Flow:
draggable="true" set on TodoCard

onDragStart: stores todoId in dataTransfer

onDragOver: calls preventDefault() and sets dropEffect

onDrop: updates todo status in local state

onDragEnter/onDragLeave: provide visual feedback for the drop area

7. Performance Optimizations
React.memo
Prevents unnecessary re-renders of Lane and TodoCard components.

useCallback
Memoizes handler functions: addTodo, updateTodo, deleteTodo, handleDragStart, handleDrop.

useMemo
Efficiently computes pendingTodos, inProgressTodos, completedTodos only when todos changes.

Scoped Modal State
Modal visibility (showAddModal, etc.) is kept local to avoid unnecessary global renders.

8. Known Limitations
Limitation	Description
No Data Persistence	Uses DummyJSON API only for fetch; all CRUD is local and lost on refresh.
Basic DnD UX	Custom DnD lacks advanced features like animations or reordering.
Limited API Features	DummyJSON is read-only for todos.

9. Suggested Enhancements
If given more time, the following features could improve the app:

Backend Integration
Add a real database (Firebase, Supabase, Express + MongoDB/PostgreSQL) for persistent storage.

Enhanced Drag and Drop
Use libraries like react-beautiful-dnd or dnd-kit for:

Reordering tasks

Animations

Better accessibility

User Authentication
Allow personal boards per user via Firebase Auth, Auth0, or similar.

Lane Management
Enable users to add, remove, or rename lanes dynamically.

Task Details View
Support sub-tasks, labels, due dates, or comments in a detailed modal view.

Filtering, Sorting, and Search
Implement search input and filter options (by title, status, priority, etc.)

Responsive Design
Further enhance UI for tablets and small screens.

Testing
Add unit tests with Jest and React Testing Library for major components and logic.

