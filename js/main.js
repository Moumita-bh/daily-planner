import { getTasks, saveTasks } from './storage.js';
import { createTaskElement } from './dom.js';
import { debounce, throttle } from './debounce.js';

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const backToTopBtn = document.getElementById('back-to-top');

let tasks = getTasks();
renderTasks(tasks);

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    const newTask = { id: Date.now(), text, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const id = Number(e.target.closest('li').dataset.id);
    tasks = tasks.filter(task => task.id !== id);
  } else if (e.target.type === 'checkbox') {
    const id = Number(e.target.closest('li').dataset.id);
    const task = tasks.find(task => task.id === id);
    task.completed = e.target.checked;
  }
  saveTasks(tasks);
  renderTasks(tasks);
});

searchInput.addEventListener('input', debounce(() => {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(task => task.text.toLowerCase().includes(query));
  renderTasks(filtered);
}, 300));

window.addEventListener('scroll', throttle(() => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
}, 200));

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function renderTasks(taskArray) {
  taskList.innerHTML = '';
  taskArray.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
}
