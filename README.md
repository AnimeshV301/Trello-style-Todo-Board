React Kanban Todo Board – Project Documentation
1. Project Overview
This project is a Trello-style Todo board built using React and styled with Tailwind CSS. It follows a component-based architecture and implements custom drag-and-drop functionality using the native HTML5 Drag and Drop API. The application is bootstrapped with Create React App and fetches initial data from the DummyJSON Todos API.
2. Getting Started
Prerequisites
- Node.js (v14 or above) - npm (v6 or above)
Available Scripts

For more details, see the Create React App documentation.
3. Architecture & Design Decisions
Component-Based Architecture
App.js: Root component responsible for: fetching initial data, managing global state, handling modals, implementing core drag-and-drop logic.
Lane: Represents a status column: 'Pending', 'In Progress', 'Completed'. Handles receiving and displaying todos and drag-and-drop logic.
TodoCard: Draggable component displaying an individual task with 'Edit' and 'Delete' actions.
Modal Components: AddTodoModal, EditTodoModal, DeleteConfirmationModal: reusable overlays for user interactions.
4. State Management
- useState: For managing todos, modal visibility, and currently edited todo.
- useRef: For draggedTodoId and nextTodoId to maintain mutable values without triggering re-renders.
5. Styling
Tailwind CSS is used throughout for utility-first styling. This promotes rapid UI development, design consistency, and responsiveness.
6. Drag and Drop Implementation
Custom HTML5 Drag-and-Drop API used due to environment constraints.
Logic Flow:
- draggable="true" set on TodoCard
- onDragStart: stores todoId in dataTransfer
- onDragOver: calls preventDefault() and sets dropEffect
- onDrop: updates todo status in local state
- onDragEnter/onDragLeave: provide visual feedback
7. Performance Optimizations
React.memo: Prevents unnecessary re-renders of Lane and TodoCard components.
useCallback: Memoizes handler functions to prevent re-creations.
useMemo: Efficiently computes filtered todos.
Scoped Modal State: Avoids global re-renders when modals open/close.
8. Known Limitations

9. Suggested Enhancements
Backend Integration: Add a real database for persistent storage.
Enhanced Drag and Drop: Use libraries like react-beautiful-dnd or dnd-kit.
User Authentication: Add user login for personalized boards.
Lane Management: Allow users to dynamically manage lanes.
Task Details View: Include sub-tasks, due dates, labels, etc.
Filtering, Sorting, and Search: Improve task discoverability.
Responsive Design: Further improve mobile layout.
Testing: Add unit and integration tests.
10. Learn More
React Documentation: https://reactjs.org/
Tailwind CSS: https://tailwindcss.com/
DummyJSON API: https://dummyjson.com/
React DnD Libraries: react-beautiful-dnd: https://github.com/atlassian/react-beautiful-dnd
