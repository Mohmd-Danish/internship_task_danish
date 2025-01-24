// Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const clearTasksButton = document.getElementById('clear-tasks');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskButton.addEventListener('click', addTask);

// Clear all tasks event
clearTasksButton.addEventListener('click', clearAllTasks);

// Function to load tasks from LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => displayTask(task));
}

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert("Task field can't be empty, Please enter a task!");

  const task = { id: Date.now(), text: taskText };
  displayTask(task);
  saveTask(task);
  taskInput.value = '';
}

// Function to display a task in the UI
function displayTask(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');
  taskDiv.innerHTML = `
    <span>${task.text}</span>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(taskDiv);
}

// Function to save a task to LocalStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  taskList.innerHTML = '';
  loadTasks();
}

// Function to clear all tasks
function clearAllTasks() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    localStorage.removeItem('tasks');
    taskList.innerHTML = '';
  }
}
