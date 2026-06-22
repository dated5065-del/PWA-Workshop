/* ===== MAIN APPLICATION FILE ===== */

let allTasks = [];
let currentFilter = 'all';
let swRegistration = null;

/**
 * Initialize the application
 */
async function initApp() {
    console.log('[App] Initializing...');
    
    try {
        // Initialize database
        await db.init();
        console.log('[App] Database initialized');
        
        // Load tasks from IndexedDB
        await loadTasks();
        
        // Register service worker
        await registerServiceWorker();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load theme preference
        loadThemePreference();
        
        // Check online status
        updateOnlineStatus();
        
        console.log('[App] Initialization complete');
    } catch (error) {
        console.error('[App] Initialization error:', error);
    }
}

/**
 * Register service worker
 */
async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('[SW] Service Workers not supported');
        return;
    }

    try {
        swRegistration = await navigator.serviceWorker.register('/js/service-worker.js', {
            scope: '/',
            updateViaCache: 'none'
        });
        
        console.log('[SW] Registered successfully');
        
        // Handle updates
        swRegistration.addEventListener('updatefound', () => {
            const newWorker = swRegistration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                    console.log('[SW] Updated');
                }
            });
        });
    } catch (error) {
        console.error('[SW] Registration failed:', error);
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add task button
    document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
    
    // Task input - Enter key
    document.getElementById('taskInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });
    
    // Clear all completed tasks
    document.getElementById('clearAllBtn').addEventListener('click', handleClearCompleted);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
    
    // Mobile menu link clicks
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            document.getElementById('menuToggle').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    
    // Online/Offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

/**
 * Handle adding a new task
 */
async function handleAddTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (!taskText) {
        alert('Please enter a task');
        return;
    }
    
    try {
        const taskId = await db.addTask(taskText);
        console.log('[App] Task added with ID:', taskId);
        
        input.value = '';
        await loadTasks();
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
        allTasks = await db.getAllTasks();
        console.log('[App] Loaded', allTasks.length, 'tasks');
        updateStats();
    } catch (error) {
        console.error('[App] Error loading tasks:', error);
    }
}

/**
 * Render tasks in the UI
 */
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    
    tasksList.innerHTML = '';
    
    let filteredTasks = allTasks;
    
    if (currentFilter === 'active') {
        filteredTasks = allTasks.filter((task) => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = allTasks.filter((task) => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const createdDate = new Date(task.createdAt).toLocaleDateString();
        
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
                <button class="task-btn edit" data-id="${task.id}" title="Edit">✏️</button>
                <button class="task-btn delete" data-id="${task.id}" title="Delete">🗑️</button>
            </div>
        `;
        
        // Toggle complete
        li.querySelector('.task-checkbox').addEventListener('change', async (e) => {
            await handleToggleTask(e.target.dataset.id);
        });
        
        // Edit button
        li.querySelector('.edit').addEventListener('click', () => {
            handleEditTask(task.id, task.text);
        });
        
        // Delete button
        li.querySelector('.delete').addEventListener('click', async () => {
            if (confirm('Are you sure?')) {
                await handleDeleteTask(task.id);
            }
        });
        
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
        await db.updateTask(taskId, { completed: !task.completed });
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
    const newText = prompt('Edit task:', currentText);
    
    if (newText === null) return;
    if (newText.trim() === '') {
        alert('Task cannot be empty');
        return;
    }
    
    try {
        await db.updateTask(taskId, { text: newText.trim() });
        await loadTasks();
        renderTasks();
    } catch (error) {
        console.error('[App] Error editing task:', error);
    }
}

/**
 * Handle deleting a task
 */
async function handleDeleteTask(taskId) {
    try {
        await db.deleteTask(taskId);
        await loadTasks();
        renderTasks();
    } catch (error) {
        console.error('[App] Error deleting task:', error);
    }
}

/**
 * Handle clearing completed tasks
 */
async function handleClearCompleted() {
    const confirmClear = confirm('Delete all completed tasks?');
    if (!confirmClear) return;
    
    try {
        const deletedCount = await db.deleteCompletedTasks();
        console.log('[App] Deleted', deletedCount, 'completed tasks');
        await loadTasks();
        renderTasks();
    } catch (error) {
        console.error('[App] Error clearing completed tasks:', error);
    }
}

/**
 * Update task statistics
 */
function updateStats() {
    const total = allTasks.length;
    const completed = allTasks.filter((task) => task.completed).length;
    const remaining = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('remainingTasks').textContent = remaining;
}

/**
 * Toggle dark theme
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

/**
 * Load saved theme preference
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
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}

/**
 * Update online status indicator
 */
function updateOnlineStatus() {
    const offlineIndicator = document.getElementById('offlineIndicator');
    
    if (navigator.onLine) {
        offlineIndicator.classList.add('hidden');
        console.log('[App] Online');
    } else {
        offlineIndicator.classList.remove('hidden');
        console.log('[App] Offline');
    }
}

/**
 * Escape HTML to prevent XSS
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
 * Set active navigation link
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initApp();
});
