export function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.textContent = task.text;
  if (task.completed) span.classList.add('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';

  li.append(checkbox, span, deleteBtn);
  return li;
}
