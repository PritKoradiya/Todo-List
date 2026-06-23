let tasks = [];
let currentFilter = "all";

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  let task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  input.value = "";
  showTasks();
}

function showTasks() {
  let list = document.getElementById("taskList");
  let searchText = document.getElementById("searchInput").value.toLowerCase();

  list.innerHTML = "";

  let filteredTasks = tasks.filter(function(task) {
    let matchSearch = task.text.toLowerCase().includes(searchText);

    if (currentFilter === "active") {
      return !task.completed && matchSearch;
    } else if (currentFilter === "completed") {
      return task.completed && matchSearch;
    } else {
      return matchSearch;
    }
  });

  if (filteredTasks.length === 0) {
    list.innerHTML = "<p class='empty'>No tasks yet. Add one above!</p>";
  }

  filteredTasks.forEach(function(task, index) {
    let li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="done-btn" onclick="completeTask(${tasks.indexOf(task)})">Done</button>
        <button class="delete-btn" onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateCounter();
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

function removeAll() {
  tasks = [];
  showTasks();
}

function filterTasks(filter) {
  currentFilter = filter;

  let buttons = document.querySelectorAll(".filters button");
  buttons.forEach(function(button) {
    button.classList.remove("active");
  });

  event.target.classList.add("active");
  showTasks();
}

function searchTask() {
  showTasks();
}

function updateCounter() {
  let completed = tasks.filter(function(task) {
    return task.completed;
  }).length;

  document.getElementById("counter").innerText =
    completed + " of " + tasks.length + " completed";
}

showTasks();

document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});