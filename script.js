window.onload = () => {
  loadTasks();
  updateProgress();
};

function addTask() {
  const taskText = document.getElementById('task-input').value.trim();
  const taskDate = document.getElementById('task-date').value;

  if (!taskText) return;

  const task = {
    id: Date.now(),
    text: taskText,
    date: taskDate,
    completed: false
  };

  saveTask(task);
  renderTask(task);
  updateProgress();

  document.getElementById('task-input').value = '';
  document.getElementById('task-date').value = '';
}

function renderTask(task) {
  const list = document.getElementById('task-list');

  const li = document.createElement('li');
  li.className = 'task';
  if (task.completed) li.classList.add('completed');
  li.setAttribute('data-id', task.id);

  li.innerHTML = `
    <div>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})" />
      ${task.text}
      <div class="task-date">${task.date}</div>
    </div>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;

  list.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.querySelector(`[data-id='${id}']`).remove();
  updateProgress();
}

function toggleComplete(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));

  const li = document.querySelector(`[data-id='${id}']`);
  li.classList.toggle('completed');
  updateProgress();
}

function updateProgress() {
  const tasks = getTasks();
  const completed = tasks.filter(t => t.completed).length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  document.getElementById('progress-bar').style.width = `${percent}%`;
}

// Toggle Dark Mode
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
