# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


2.Approach Taken & Design Decisions
The application is built using React, following a component-based architecture for modularity and reusability.

Component-Based Architecture:

App.js: The main application component, responsible for fetching data, managing the global state of todos, and orchestrating interactions between different parts of the application. It also handles the modal visibility and the core drag-and-drop logic.

Lane Component: Represents a single column (e.g., "Pending", "In Progress", "Completed"). It receives the list of todos relevant to its status and handles drag-and-drop events for its area.

TodoCard Component: Displays an individual task. It's draggable and contains actions like "Edit" and "Delete".

Modal Components (AddTodoModal, EditTodoModal, DeleteConfirmationModal): Separate components for user interactions that require overlays, ensuring a clean separation of concerns and reusable UI.

State Management:

React's built-in useState hook is used for managing component-specific states (e.g., todos array, modal visibility, current editing todo).

useRef is used for draggedTodoId and nextTodoId to maintain mutable values across renders without triggering re-renders, which is suitable for drag-and-drop state and simple ID generation.

Styling:

Tailwind CSS: A utility-first CSS framework is used for all styling. This allows for rapid UI development directly within the JSX, promoting consistency and responsiveness without writing custom CSS files.

Drag and Drop Implementation:

Due to environment constraints, a custom HTML5 Drag and Drop API implementation is used instead of external libraries.

draggable="true" attribute on TodoCard makes it draggable.

onDragStart on TodoCard sets the dataTransfer object with the todo's ID.

onDragOver on Lane prevents the default browser behavior (which disallows dropping) and sets the dropEffect.

onDrop on Lane retrieves the dragged todo's ID and updates the todos state to reflect the new status.

Visual feedback (lane background change) is implemented using onDragEnter and onDragLeave to enhance user experience.

3. Performance Optimizations
Several React features and patterns have been applied to optimize performance:

React.memo: The Lane and TodoCard components are wrapped with React.memo. This higher-order component prevents re-rendering of these components if their props haven't changed, significantly reducing unnecessary renders, especially when only a small part of the todos array is updated.

useCallback: Functions like handleDragStart, handleDrop, addTodo, updateTodo, and deleteTodo are memoized using useCallback. This ensures that these functions are not re-created on every render of the App component, preventing unnecessary re-renders of child components that depend on them.

useMemo: The pendingTodos, inProgressTodos, and completedTodos arrays are memoized using useMemo. This ensures that these filtered lists are only re-calculated when the todos array itself changes, avoiding expensive re-filtering on every render.

Local State for Modals: State variables controlling modal visibility (showAddModal, showEditModal, showDeleteModal) are managed directly in the App component. This prevents the entire application from re-rendering just because a modal is opened or closed.

4. Known Limitations
No Data Persistence: As per the requirement to use the DummyJSON API, this application does not persist data. Any tasks added, edited, or moved will be lost when the browser tab is closed or refreshed. The DummyJSON API is primarily for fetching static data and does not support actual write operations for user data.

Basic Drag and Drop UX: The custom HTML5 Drag and Drop implementation is functional but lacks advanced features found in dedicated libraries (e.g., visual placeholders for dragged items, smooth animations during drag, reordering within the same lane).

Limited API Functionality: The DummyJSON API is used only for initial data fetching. All CRUD operations (create, update, delete) are simulated locally within the browser's memory.

5. Additional Enhancements
If given more time, the following enhancements would significantly improve the application:

Real Backend Integration:

Implement a proper backend (e.g., Node.js with Express, Python with Flask/Django, or a serverless solution like Firebase Firestore, Supabase, AWS Amplify) to enable persistent storage of tasks. This would allow users to save their boards and access them across sessions.

Enhanced Drag and Drop Library:

Integrate a more robust drag-and-drop library like react-beautiful-dnd (if environment permits) or dnd-kit to provide a smoother user experience, including visual cues, reordering within lanes, and better accessibility.

User Authentication:

Add user authentication (e.g., Firebase Authentication, Auth0) to allow multiple users to have their own personalized todo boards.

More Dynamic Lane Management:

Allow users to dynamically add, remove, and rename lanes.

Task Details View:

Implement a more detailed view for each task, potentially allowing for sub-tasks, due dates, labels, or comments.

Filtering and Sorting:

Add options to filter tasks by title, description, or status, and sort them by creation date, due date, or priority.

Search Functionality:

Enable searching for tasks by keywords.

Responsive Design Refinements:

Further optimize the layout and interactions for a seamless experience across a wider range of devices and screen sizes.

Unit and Integration Tests:

Write comprehensive tests for components and application logic to ensure stability and prevent regressions.