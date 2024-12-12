// Select DOM elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load existing todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add a new to-do
addBtn.addEventListener('click', addTodo);

// Add a to-do on Enter key press
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Add Todo Function
function addTodo() {
    const task = todoInput.value.trim();
    if (task === '') return alert('Please enter a task.');

    const todo = { text: task, completed: false };
    saveTodoToLocal(todo);

    renderTodoItem(todo);
    todoInput.value = '';
}

// Render To-Do Item
function renderTodoItem(todo) {
    const li = document.createElement('li');
    li.className = todo-item ${todo.completed ? 'completed' : ''};

    li.innerHTML = `
        <span>${todo.text}</span>
        <div class="actions">
            <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Complete Button
    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(li, todo));

    // Delete Button
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodoItem(li, todo));

    todoList.appendChild(li);
}

// Toggle Complete
function toggleComplete(li, todo) {
    todo.completed = !todo.completed;
    li.classList.toggle('completed');
    updateTodosInLocal(todo);
    li.querySelector('.complete-btn').textContent = todo.completed ? 'Undo' : 'Complete';
}

// Delete To-Do
function deleteTodoItem(li, todo) {
    li.remove();
    deleteTodoFromLocal(todo);
}

// LocalStorage Functions
function saveTodoToLocal(todo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(renderTodoItem);
}

function updateTodosInLocal(updatedTodo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const index = todos.findIndex((t) => t.text === updatedTodo.text);
    if (index !== -1) todos[index] = updatedTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoFromLocal(todoToDelete) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter((t) => t.text !== todoToDelete.text);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}