# 🎓 Complete Step-by-Step PWA Workshop Guide with Code Explanations

## Table of Contents
1. [Project Structure Explained](#project-structure)
2. [HTML Files Breakdown](#html-files)
3. [CSS Styling Explained](#css-styling)
4. [JavaScript Files Explained](#javascript-files)
5. [How Everything Works Together](#integration)
6. [Testing Steps](#testing)

---

## 📂 Project Structure

```
PWA-Workshop/
├── index.html              ← Home page with task manager interface
├── about.html              ← About the app page
├── features.html           ← Features showcase page
├── contact.html            ← Contact form & FAQ page
├── offline.html            ← Page shown when offline
├── manifest.json           ← PWA installation metadata
├── README.md              ← Project overview
├── DOCUMENTATION.md       ← Detailed documentation
├── css/
│   └── styles.css         ← All styling (responsive + dark mode)
└── js/
    ├── app.js             ��� Main app logic (tasks, UI)
    ├── db.js              ← IndexedDB database operations
    ├── contact.js         ← Contact form handling
    └── service-worker.js  ← Offline support & caching
```

**Why This Structure?**
- **Separation of Concerns:** HTML (content), CSS (style), JS (logic)
- **Scalability:** Easy to add more pages or features
- **Maintainability:** Each file has a specific purpose
- **Performance:** Can lazy load JavaScript as needed

---

## 🏠 HTML Files Explained

### 1. **index.html** - The Main App Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags for browser and PWA -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="TaskFlow - Progressive Web App...">
    <meta name="theme-color" content="#6366f1">  <!-- Browser tab color -->
    
    <title>TaskFlow - Task Manager PWA</title>
    
    <!-- PWA Manifest - tells browser how to install the app -->
    <link rel="manifest" href="manifest.json">
    
    <!-- App icons for different devices -->
    <link rel="icon" href="assets/icon-192x192.png">
    <link rel="apple-touch-icon" href="assets/icon-192x192.png">
    
    <!-- Link to main stylesheet -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo Section -->
            <div class="nav-brand">
                <span class="logo-icon">✓</span>  <!-- Check mark icon -->
                <h1>TaskFlow</h1>
            </div>
            
            <!-- Navigation Links -->
            <ul class="nav-links">
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="features.html">Features</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            
            <!-- Controls (Theme toggle + Mobile menu) -->
            <div class="nav-controls">
                <button id="themeToggle" class="theme-btn" title="Toggle Dark Mode">
                    🌙  <!-- Moon emoji for light mode, sun for dark -->
                </button>
                <button class="menu-toggle" id="menuToggle">☰</button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container">
        <!-- Hero Section -->
        <section class="hero">
            <h2>Welcome to TaskFlow</h2>
            <p>Your personal task manager that works offline...</p>
        </section>

        <!-- Task Input Section -->
        <section class="task-section">
            <div class="task-input-container">
                <!-- Input field for new tasks -->
                <input 
                    type="text" 
                    id="taskInput" 
                    class="task-input" 
                    placeholder="Add a new task..."
                    autocomplete="off"
                >
                <!-- Button to add task -->
                <button id="addTaskBtn" class="btn btn-primary">Add Task</button>
            </div>
        </section>

        <!-- Filter Buttons Section -->
        <section class="filter-section">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </section>

        <!-- Task List Container -->
        <section class="tasks-container">
            <!-- This will be populated by JavaScript -->
            <ul id="tasksList" class="tasks-list">
                <!-- Tasks will be added here dynamically -->
            </ul>
            <!-- Empty state message -->
            <div id="emptyState" class="empty-state">
                <p>📝 No tasks yet. Add one to get started!</p>
            </div>
        </section>

        <!-- Statistics Section -->
        <section class="stats-section">
            <div class="stat-box">
                <span class="stat-label">Total Tasks</span>
                <span id="totalTasks" class="stat-value">0</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Completed</span>
                <span id="completedTasks" class="stat-value">0</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Remaining</span>
                <span id="remainingTasks" class="stat-value">0</span>
            </div>
        </section>

        <!-- Clear Button -->
        <section class="action-section">
            <button id="clearAllBtn" class="btn btn-danger">
                Clear Completed Tasks
            </button>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2026 TaskFlow PWA. Built with ❤️ for better productivity...</p>
    </footer>

    <!-- Offline Indicator (shown when disconnected) -->
    <div id="offlineIndicator" class="offline-indicator hidden">
        📡 You're offline - Changes will sync when back online
    </div>

    <!-- Load JavaScript files -->
    <script src="js/app.js"></script>
</body>
</html>
```

**Key Points in index.html:**
- `<meta name="viewport">` - Makes app responsive on mobile
- `<link rel="manifest">` - Enables PWA installation
- `id="taskInput"` and `id="addTaskBtn"` - JavaScript targets these with getElementById()
- `id="tasksList"` - JavaScript populates this with tasks
- Scripts loaded at end - Better performance

---

## 🎨 CSS Styling Explained (css/styles.css)

### Part 1: CSS Variables & Theme System

```css
/* ===== CSS VARIABLES & THEME COLORS ===== */
:root {
    /* These are like "variables" in CSS */
    /* Primary Colors - Used for buttons, accents */
    --primary-color: #6366f1;      /* Indigo */
    --primary-dark: #4f46e5;       /* Darker indigo */
    --primary-light: #818cf8;      /* Lighter indigo */
    
    /* Neutral Colors - Used for text and backgrounds */
    --text-dark: #1f2937;          /* Dark gray for text */
    --text-light: #6b7280;         /* Light gray for secondary text */
    --bg-light: #f9fafb;           /* Light background */
    --bg-white: #ffffff;           /* White for cards */
    --border-color: #e5e7eb;       /* Light border color */
    
    /* Status Colors - For success/error messages */
    --success-color: #10b981;      /* Green */
    --danger-color: #ef4444;       /* Red */
    --warning-color: #f59e0b;      /* Orange */
    
    /* Spacing System - Consistent gaps between elements */
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 1rem;       /* 16px */
    --spacing-lg: 1.5rem;     /* 24px */
    --spacing-xl: 2rem;       /* 32px */
    --spacing-2xl: 3rem;      /* 48px */
}

/* ===== DARK MODE OVERRIDE ===== */
body.dark-mode {
    /* When body has class "dark-mode", these variables override :root */
    --text-dark: #f3f4f6;      /* Light text for dark background */
    --text-light: #d1d5db;     /* Lighter gray */
    --bg-light: #1f2937;       /* Dark background */
    --bg-white: #111827;       /* Even darker for cards */
    --border-color: #374151;   /* Dark border */
}
```

**Explanation:**
- CSS variables are defined with `--name`
- Used with `var(--name)` throughout the CSS
- When dark mode is enabled, JavaScript adds `dark-mode` class to body
- This changes ALL color variables at once - very efficient!

### Part 2: Global Styles

```css
* {
    margin: 0;           /* Remove default margins */
    padding: 0;          /* Remove default padding */
    box-sizing: border-box; /* Include borders in width calculation */
}

html {
    scroll-behavior: smooth;  /* Smooth scrolling to anchors */
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--font-base);  /* Use variable */
    color: var(--text-dark);      /* Use variable for color */
    background-color: var(--bg-light);  /* Use variable for background */
    line-height: 1.6;  /* Space between lines for readability */
    
    /* Smooth transition when theme changes */
    transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Part 3: Navbar Styling

```css
.navbar {
    background-color: var(--bg-white);
    box-shadow: var(--shadow-md);    /* Shadow effect */
    position: sticky;                 /* Stays at top when scrolling */
    top: 0;
    z-index: 100;                    /* Above other content */
}

.nav-container {
    max-width: 1200px;              /* Container max width */
    margin: 0 auto;                 /* Center container */
    padding: var(--spacing-md) var(--spacing-lg);  /* Padding */
    display: flex;                  /* Side by side layout */
    justify-content: space-between; /* Space elements apart */
    align-items: center;            /* Vertically centered */
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);         /* Space between icon and text */
}

.nav-brand h1 {
    font-size: var(--font-xl);
    margin: 0;                      /* No default heading margins */
}
```

### Part 4: Buttons Styling

```css
.btn {
    padding: var(--spacing-md) var(--spacing-xl);
    border: none;
    border-radius: var(--radius-lg);
    font-size: var(--font-base);
    font-weight: 600;
    cursor: pointer;
    
    /* Smooth animation when hovering */
    transition: all 0.3s ease;
    
    display: inline-flex;           /* Align content inside */
    align-items: center;
    gap: var(--spacing-sm);
}

.btn-primary {
    /* Gradient background (color blend) */
    background: linear-gradient(135deg, var(--primary-color) 0%, 
                                        var(--primary-dark) 100%);
    color: white;
    box-shadow: var(--shadow-md);
}

.btn-primary:hover {
    /* Move button up slightly on hover */
    transform: translateY(-2px);
    /* Increase shadow */
    box-shadow: var(--shadow-lg);
}

.btn-primary:active {
    /* Return to normal position when clicked */
    transform: translateY(0);
}

.btn-danger {
    background-color: var(--danger-color);  /* Red */
    color: white;
}
```

### Part 5: Task Item Styling

```css
.task-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease;
}

.task-item:hover {
    /* Slight background color on hover */
    background-color: var(--bg-light);
}

.task-checkbox {
    width: 24px;
    height: 24px;
    cursor: pointer;
    accent-color: var(--primary-color);  /* Checkbox color */
}

.task-content {
    flex: 1;  /* Takes up remaining space */
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.task-text {
    font-size: var(--font-base);
    word-break: break-word;  /* Break long words */
}

/* When task is completed, add strikethrough */
.task-item.completed .task-text {
    text-decoration: line-through;
    color: var(--text-light);  /* Fade text color */
}
```

### Part 6: Responsive Design

```css
/* Desktop version is what we see by default */

/* Tablet (768px and below) */
@media (max-width: 768px) {
    .nav-links {
        /* Hide by default on mobile */
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background-color: var(--bg-white);
        padding: var(--spacing-lg);
        gap: 0;
        box-shadow: var(--shadow-lg);
    }

    /* Show menu when active class is added by JavaScript */
    .nav-links.active {
        display: flex;
    }

    /* Show hamburger menu on mobile */
    .menu-toggle {
        display: block;
    }

    /* Change grid layouts */
    .stats-section {
        grid-template-columns: 1fr;  /* Single column */
    }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
    /* Reduce font sizes */
    .hero h2 {
        font-size: var(--font-xl);
    }

    /* Make buttons full width */
    .btn {
        width: 100%;
    }
}
```

**CSS Responsive Design Explained:**
- **Desktop First:** Write styles for desktop, then override for smaller screens
- **Media Queries:** `@media (max-width: 768px)` applies styles when screen ≤ 768px
- **Mobile Menu:** Hidden by default, shown with JavaScript
- **Grid Columns:** Change from `repeat(auto-fit, minmax(250px, 1fr))` to `1fr` on mobile

---

## 💻 JavaScript Files Explained

### 1. **js/db.js** - Database Handler (IndexedDB)

```javascript
/* ===== INDEXEDDB DATABASE ===== */
class TaskDatabase {
    constructor() {
        this.dbName = 'TaskFlowDB';    /* Database name */
        this.storeName = 'tasks';       /* Where tasks are stored */
        this.version = 1;               /* Version for migrations */
        this.db = null;                 /* Reference to database */
    }

    /**
     * Initialize the database
     * This creates the database if it doesn't exist
     */
    async init() {
        return new Promise((resolve, reject) => {
            /* Open or create database */
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('[DB] Error opening database');
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;  /* Save database reference */
                console.log('[DB] Database initialized');
                resolve(this.db);
            };

            /* When database needs to be created/upgraded */
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                /* Create object store (like a table) if it doesn't exist */
                if (!db.objectStoreNames.contains(this.storeName)) {
                    /* Create store with auto-incrementing ID */
                    const objectStore = db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    
                    /* Create indexes for fast searching */
                    objectStore.createIndex('completed', 'completed', 
                                           { unique: false });
                    objectStore.createIndex('createdAt', 'createdAt', 
                                           { unique: false });
                }
            };
        });
    }

    /**
     * Add a new task
     * @param {string} task - Task text to add
     */
    async addTask(task) {
        /* Start a read-write transaction */
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        
        /* Create task object with timestamp */
        const taskData = {
            text: task,
            completed: false,
            createdAt: new Date().toISOString(),  /* Date/time created */
            syncStatus: 'pending'
        };

        return new Promise((resolve, reject) => {
            /* Add task to database */
            const request = store.add(taskData);
            request.onsuccess = () => resolve(request.result);  /* Return ID */
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all tasks from database
     */
    async getAllTasks() {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            const request = store.getAll();  /* Get all records */
            request.onsuccess = () => resolve(request.result);  /* Array of tasks */
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Update a task
     * @param {number} id - Task ID
     * @param {object} updates - Fields to update
     */
    async updateTask(id, updates) {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            /* First, get the task */
            const getRequest = store.get(id);
            
            getRequest.onsuccess = () => {
                const task = getRequest.result;
                /* Merge old data with updates */
                const updatedTask = { ...task, ...updates, syncStatus: 'pending' };
                
                /* Save updated task */
                const updateRequest = store.put(updatedTask);
                updateRequest.onsuccess = () => resolve(updateRequest.result);
                updateRequest.onerror = () => reject(updateRequest.error);
            };
        });
    }

    /**
     * Delete a task
     * @param {number} id - Task ID to delete
     */
    async deleteTask(id) {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            const request = store.delete(id);  /* Delete by ID */
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete all completed tasks
     */
    async deleteCompletedTasks() {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const index = store.index('completed');  /* Use index for speed */

        return new Promise((resolve, reject) => {
            /* Get all completed tasks */
            const range = IDBKeyRange.only(true);  /* Only true (completed) */
            const request = index.openCursor(range);
            let deletedCount = 0;

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();  /* Delete current record */
                    deletedCount++;
                    cursor.continue();  /* Move to next record */
                } else {
                    resolve(deletedCount);  /* All deleted */
                }
            };
        });
    }
}

/* Create global database instance */
const db = new TaskDatabase();
```

**IndexedDB Explained:**
- **Database:** Like storing data in the browser (offline)
- **Object Store:** Like a table in SQL
- **Transaction:** A group of operations (all or nothing)
- **Async:** Operations are asynchronous (don't block UI)
- **Indexes:** Speed up searching (like SQL indexes)

---

### 2. **js/app.js** - Main Application Logic

```javascript
/* ===== MAIN APPLICATION FILE ===== */

let allTasks = [];           /* Array storing all tasks */
let currentFilter = 'all';   /* Current filter: all/active/completed */
let swRegistration = null;   /* Service worker registration */

/**
 * Initialize the application
 * This runs when page loads
 */
async function initApp() {
    console.log('[App] Initializing...');
    
    try {
        /* Step 1: Initialize database */
        await db.init();
        console.log('[App] Database initialized');
        
        /* Step 2: Load tasks from IndexedDB */
        await loadTasks();
        
        /* Step 3: Register service worker for offline support */
        await registerServiceWorker();
        
        /* Step 4: Setup all event listeners */
        setupEventListeners();
        
        /* Step 5: Load saved theme (light/dark) */
        loadThemePreference();
        
        /* Step 6: Check if online or offline */
        updateOnlineStatus();
        
        console.log('[App] Initialization complete');
    } catch (error) {
        console.error('[App] Initialization error:', error);
    }
}

/**
 * Register service worker for offline support
 */
async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('[SW] Service Workers not supported');
        return;  /* Exit if not supported */
    }

    try {
        /* Register service worker file */
        swRegistration = await navigator.serviceWorker.register(
            '/js/service-worker.js', 
            {
                scope: '/',              /* Available to whole site */
                updateViaCache: 'none'   /* Always check for updates */
            }
        );
        
        console.log('[SW] Registered successfully');
    } catch (error) {
        console.error('[SW] Registration failed:', error);
    }
}

/**
 * Setup all event listeners (click, input, etc.)
 */
function setupEventListeners() {
    /* Add task button - click */
    document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
    
    /* Task input - Enter key */
    document.getElementById('taskInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {  /* Check if Enter was pressed */
            handleAddTask();
        }
    });
    
    /* Clear all completed - click */
    document.getElementById('clearAllBtn').addEventListener('click', handleClearCompleted);
    
    /* Filter buttons - click */
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            /* Remove active class from all buttons */
            document.querySelectorAll('.filter-btn').forEach((b) => 
                b.classList.remove('active')
            );
            /* Add active class to clicked button */
            btn.classList.add('active');
            /* Update current filter */
            currentFilter = btn.dataset.filter;  /* Get filter from data attribute */
            /* Redraw tasks */
            renderTasks();
        });
    });
    
    /* Theme toggle - click moon/sun button */
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    /* Mobile menu toggle - hamburger button */
    document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
    
    /* Online/Offline events */
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

/**
 * Handle adding a new task
 */
async function handleAddTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();  /* Get and trim input */
    
    if (!taskText) {
        alert('Please enter a task');
        return;
    }
    
    try {
        /* Add to database */
        const taskId = await db.addTask(taskText);
        console.log('[App] Task added with ID:', taskId);
        
        /* Clear input */
        input.value = '';
        
        /* Reload tasks from database */
        await loadTasks();
        
        /* Redraw task list */
        renderTasks();
    } catch (error) {
        console.error('[App] Error adding task:', error);
        alert('Failed to add task');
    }
}

/**
 * Load tasks from IndexedDB
 */
async function loadTasks() {
    try {
        /* Get all tasks from database */
        allTasks = await db.getAllTasks();
        console.log('[App] Loaded', allTasks.length, 'tasks');
        /* Update statistics */
        updateStats();
    } catch (error) {
        console.error('[App] Error loading tasks:', error);
    }
}

/**
 * Render tasks in the UI
 * This updates what user sees
 */
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    
    /* Clear existing list */
    tasksList.innerHTML = '';
    
    /* Filter tasks based on current filter */
    let filteredTasks = allTasks;
    
    if (currentFilter === 'active') {
        /* Show only incomplete tasks */
        filteredTasks = allTasks.filter((task) => !task.completed);
    } else if (currentFilter === 'completed') {
        /* Show only completed tasks */
        filteredTasks = allTasks.filter((task) => task.completed);
    }
    
    /* Show empty state if no tasks */
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    /* Create HTML for each task */
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const createdDate = new Date(task.createdAt).toLocaleDateString();
        
        /* HTML structure for each task */
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            >
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-time">${createdDate}</div>
            </div>
            <div class="task-actions">
                <button class="task-btn edit" data-id="${task.id}">✏️</button>
                <button class="task-btn delete" data-id="${task.id}">🗑️</button>
            </div>
        `;
        
        /* Add event listeners to this task */
        
        /* Toggle complete checkbox */
        li.querySelector('.task-checkbox').addEventListener('change', async (e) => {
            await handleToggleTask(e.target.dataset.id);
        });
        
        /* Edit button */
        li.querySelector('.edit').addEventListener('click', () => {
            handleEditTask(task.id, task.text);
        });
        
        /* Delete button */
        li.querySelector('.delete').addEventListener('click', async () => {
            if (confirm('Are you sure?')) {  /* Confirm before delete */
                await handleDeleteTask(task.id);
            }
        });
        
        /* Add to list */
        tasksList.appendChild(li);
    });
}

/**
 * Handle toggling task completion
 */
async function handleToggleTask(taskId) {
    const task = allTasks.find((t) => t.id == taskId);
    if (!task) return;
    
    try {
        /* Update in database */
        await db.updateTask(taskId, { completed: !task.completed });
        /* Reload and redraw */
        await loadTasks();
        renderTasks();
    } catch (error) {
        console.error('[App] Error toggling task:', error);
    }
}

/**
 * Handle editing a task
 */
async function handleEditTask(taskId, currentText) {
    /* Prompt user for new text */
    const newText = prompt('Edit task:', currentText);
    
    if (newText === null) return;  /* User cancelled */
    if (newText.trim() === '') {
        alert('Task cannot be empty');
        return;
    }
    
    try {
        /* Update in database */
        await db.updateTask(taskId, { text: newText.trim() });
        /* Reload and redraw */
        await loadTasks();
        renderTasks();
    } catch (error) {
        console.error('[App] Error editing task:', error);
    }
}

/**
 * Update statistics display
 */
function updateStats() {
    const total = allTasks.length;
    const completed = allTasks.filter((task) => task.completed).length;
    const remaining = total - completed;
    
    /* Update HTML elements */
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('remainingTasks').textContent = remaining;
}

/**
 * Toggle dark theme
 */
function toggleTheme() {
    /* Add or remove dark-mode class from body */
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('themeToggle');
    
    /* Change button emoji */
    themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    
    /* Save preference to browser storage */
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

/**
 * Load saved theme preference from browser storage
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌙';
    }
}

/**
 * Update online status indicator
 */
function updateOnlineStatus() {
    const offlineIndicator = document.getElementById('offlineIndicator');
    
    if (navigator.onLine) {
        /* Online - hide offline message */
        offlineIndicator.classList.add('hidden');
        console.log('[App] Online');
    } else {
        /* Offline - show offline message */
        offlineIndicator.classList.remove('hidden');
        console.log('[App] Offline');
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * Replace special characters with HTML entities
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Initialize when page is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();  /* Highlight current page in menu */
    initApp();           /* Start the app */
});
```

**Key JavaScript Concepts:**

1. **Async/Await:** Waits for database operations to complete
```javascript
await db.init();  // Wait for database to initialize
```

2. **Event Listeners:** Listen for user actions
```javascript
btn.addEventListener('click', handleClick);
```

3. **Array Methods:** Filter, map, find
```javascript
allTasks.filter(t => !t.completed);  // Get incomplete tasks
```

4. **DOM Manipulation:** Change HTML
```javascript
document.getElementById('tasksList').innerHTML = '...';
```

---

### 3. **js/service-worker.js** - Offline Support

```javascript
/* ===== SERVICE WORKER ===== */
const CACHE_NAME = 'taskflow-v1';  /* Name of cache */

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/about.html',
    '/features.html',
    '/contact.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/contact.js',
    '/manifest.json',
    '/offline.html'
];

/* ===== INSTALLATION EVENT ===== */
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        /* Open cache and add all files */
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching assets');
            return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
                console.error('[Service Worker] Cache addAll error:', error);
                return Promise.resolve();  /* Continue even if some fail */
            });
        })
    );
    
    self.skipWaiting();  /* Activate immediately */
});

/* ===== ACTIVATION EVENT ===== */
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        /* Delete old caches */
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim();  /* Take control of all pages */
});

/* ===== FETCH EVENT - HANDLE ALL NETWORK REQUESTS ===== */
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    /* Skip cross-origin requests */
    if (url.origin !== location.origin) {
        return;
    }

    /* Navigation requests (loading pages) */
    if (request.mode === 'navigate') {
        event.respondWith(
            /* Try cache first */
            caches.match(request).then((response) => {
                return (
                    response ||
                    /* If not in cache, try network */
                    fetch(request).then((fetchResponse) => {
                        /* Cache successful responses */
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, fetchResponse.clone());
                            return fetchResponse;
                        });
                    }).catch(() => {
                        /* If offline and not cached, show offline page */
                        return caches.match('/offline.html');
                    })
                );
            })
        );
        return;
    }

    /* All other requests */
    event.respondWith(
        /* Check cache first */
        caches.match(request).then((response) => {
            if (response) {
                return response;  /* Return from cache */
            }

            /* Try network */
            return fetch(request).then((fetchResponse) => {
                /* Cache successful responses */
                if (fetchResponse.status === 200) {
                    const responseToCache = fetchResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }
                return fetchResponse;
            }).catch((error) => {
                console.error('[SW] Fetch failed:', error);
                /* Return offline page on network error */
                return caches.match('/offline.html');
            });
        })
    );
});
```

**Service Worker Explained:**

**Lifecycle:**
1. **Install:** Download and cache assets
2. **Activate:** Clean old caches
3. **Fetch:** Intercept network requests

**Caching Strategy (Cache-First):**
1. User requests resource
2. Check if in cache → Serve from cache
3. Not in cache → Fetch from network
4. Save to cache for next time
5. If offline → Serve from cache or offline.html

---

### 4. **js/contact.js** - Contact Form Handler

```javascript
/* ===== CONTACT FORM HANDLER ===== */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        /* Only on contact page */
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

/**
 * Handle contact form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();  /* Don't reload page */
    
    const form = event.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    
    /* Validate all fields are filled */
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    /* Validate email format */
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        /* In real app, send to server */
        /* For now, store locally */
        
        const contactData = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };
        
        /* Get existing messages from localStorage */
        const existingMessages = JSON.parse(
            localStorage.getItem('contactMessages') || '[]'
        );
        
        /* Add new message */
        existingMessages.push(contactData);
        
        /* Save back to localStorage */
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
        
        console.log('[Contact] Message stored:', contactData);
        
        /* Show success */
        showFormMessage('Thank you! Your message has been received.', 'success');
        
        /* Clear form */
        form.reset();
        
        /* Hide message after 5 seconds */
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
        
    } catch (error) {
        console.error('[Contact] Error:', error);
        showFormMessage('An error occurred. Please try again later.', 'error');
    }
}

/**
 * Show feedback message to user
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;  /* Add success or error class */
}

/**
 * Validate email format using regex
 */
function isValidEmail(email) {
    /* Basic email validation */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

---

## 🔗 How Everything Works Together

### Complete Flow Diagram:

```
User Opens App (index.html)
    ↓
HTML loads, displays page
    ↓
app.js runs:
    → Initializes database (db.js)
    → Registers service worker (service-worker.js)
    → Loads tasks from IndexedDB
    → Renders tasks on page
    ↓
Service Worker:
    → Caches all assets
    → Listens for network requests
    → Serves from cache when offline
    ↓
User Adds Task:
    1. Clicks "Add Task" button
    2. app.js calls handleAddTask()
    3. Task added to IndexedDB via db.js
    4. loadTasks() reloads from database
    5. renderTasks() updates HTML
    ↓
Dark Mode Toggle:
    1. Clicks moon/sun button
    2. app.js adds/removes dark-mode class to body
    3. CSS variables update automatically
    4. localStorage saves preference
    ↓
User Goes Offline:
    1. No internet connection
    2. Service Worker serves from cache
    3. App continues to work
    4. Tasks still visible from IndexedDB
    5. New tasks saved to IndexedDB
    ↓
User Goes Online:
    1. Internet reconnected
    2. Offline indicator disappears
    3. Data ready to sync (when sync feature added)
```

---

## 🧪 Testing Every Feature

### Test 1: Adding Tasks
```
1. Open app in browser
2. Type "Buy groceries" in input
3. Click "Add Task" or press Enter
4. Task appears in list

Behind the scenes:
- handleAddTask() called
- db.addTask() adds to IndexedDB
- loadTasks() retrieves all tasks
- renderTasks() displays task
```

### Test 2: Offline Functionality
```
1. DevTools → Network tab
2. Check "Offline" checkbox
3. App still works
4. Can still add/edit/delete tasks
5. Refresh page - tasks still there

Behind the scenes:
- Service worker intercepts requests
- Serves from cache or offline.html
- IndexedDB provides task data
- No network call is made
```

### Test 3: Dark Mode
```
1. Click moon icon (🌙)
2. Page colors change to dark
3. Moon becomes sun (☀️)
4. Refresh page - dark mode persists
5. Click sun to go back to light

Behind the scenes:
- toggleTheme() adds/removes class
- CSS variables automatically update
- localStorage saves preference
- loadThemePreference() restores on load
```

### Test 4: Task Filtering
```
1. Add multiple tasks
2. Mark some as complete
3. Click "Active" - shows only incomplete
4. Click "Completed" - shows only complete
5. Click "All" - shows everything

Behind the scenes:
- currentFilter variable tracks selection
- renderTasks() filters array based on currentFilter
- Only matching tasks are displayed
```

### Test 5: Service Worker
```
DevTools → Application tab:
1. Service Workers section - should show "activated"
2. Cache Storage:
   - taskflow-v1 should list cached files
3. IndexedDB:
   - TaskFlowDB → tasks should list your tasks
```

---

## 📊 Key Concepts Summary

| Concept | What It Is | Why Used |
|---------|-----------|---------|
| **IndexedDB** | Browser database | Offline storage |
| **Service Worker** | Background script | Caching & offline |
| **CSS Variables** | Reusable CSS values | Easy dark mode |
| **Async/Await** | Wait for async ops | Don't freeze UI |
| **Fetch API** | Network requests | Download from server |
| **Event Listeners** | React to user actions | Interactivity |
| **localStorage** | Simple key-value store | Save small data |
| **Web Manifest** | PWA metadata | Installation |

---

This is your **complete step-by-step guide** with every concept and code explained! You now understand how every part of the PWA works. 🚀

