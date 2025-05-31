React Kanban Todo Board – Project Documentation
1. Project Overview
This project is a Trello-style Todo board built using React and styled with Tailwind CSS. It follows a component-based architecture and implements custom drag-and-drop functionality using the native HTML5 Drag and Drop API. The application is bootstrapped with Create React App and fetches initial data from the DummyJSON Todos API.

2. Getting Started
Prerequisites
Node.js (v14 or above)

npm (v6 or above)

Available Scripts
In the project directory, you can run:

Command	Description
npm start	Runs the app in development mode at http://localhost:3000/.
npm test	Launches the test runner in interactive watch mode.
npm run build	Builds the app for production into the build folder.
npm run eject	Ejects configuration (irreversible). Use only if full customization needed.

For more details, see the Create React App documentation.

3. Architecture & Design Decisions
Component-Based Architecture
App.js
Root component responsible for:

Fetching initial data

Managing global state

Handling modals

Implementing core drag-and-drop logic

Lane
Represents a status column: "Pending", "In Progress", "Completed".
Handles:

Receiving and displaying todos based on status

Drag-and-drop logic for lane area

TodoCard
Draggable component displaying an individual task with "Edit" and "Delete" actions.

Modal Components

AddTodoModal

EditTodoModal

DeleteConfirmationModal
These are reusable overlays for user interactions, separated for clarity and modularity.

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

