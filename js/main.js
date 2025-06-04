let filterLevel = document.querySelector("#filter-level");
let selectLevel = document.querySelector("#taskLevel");
let taskForm = document.querySelector(".task-form");
let taskmodal = document.querySelector(".task-modal");
let tasksTable = document.querySelector(".tasks-table tbody");
let openModalBtn = document.querySelector(".open-modal-btn");
let tasksJson = localStorage.getItem("tasks");
let searchInput = document.querySelector(".search-input");
let addModalBtn = document.querySelector(".add-modal-btn ");
let tasks = JSON.parse(tasksJson) || [];

let selected = null;
let search = "";
let level = "All";
filterLevel.innerHTML += `<option>All</option>`;
levels.map((level) => {
  filterLevel.innerHTML += `<option>${level}</option>`;
  selectLevel.innerHTML += `<option>${level}</option>`;
});

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("was-validated");
  if (this.checkValidity()) {
    const { taskName, taskTime, taskLevel } = this.elements;
    const task = {
      taskName: taskName.value,
      taskTime: taskTime.value,
      taskLevel: taskLevel.value,
    };

    if (selected === null) {
      tasks.push(task);
    } else {
      tasks[selected] = task;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    bootstrap.Modal.getInstance(taskmodal).hide();
    this.classList.remove("was-validated");

    getTasks();
  }
});

function getTaskCard({ taskName, taskTime, taskLevel }, i) {
  let levelColor = {
    Low: "info",
    Middle: "warning",
    High: "danger",
  };

  return `<tr>
  <th scope="row">${i + 1}</th>
  <td colspan="3">
    <div class="d-flex justify-content-between w-100">
      <span>${taskName}</span>
      <span  class="badge bg-${levelColor[taskLevel]}">${taskTime}</span>
    </div>
    <div class="d-flex gap-2 mt-2 w-100">
      <button  onClick="editTask(${i})" data-bs-toggle="modal" data-bs-target="#task-modal" class="btn btn-primary btn-sm w-50">
        <img src="./assets/image/edit.png" alt="Edit" />
      </button>
      <button onClick="deleteTask(${i})" class="btn btn-danger btn-sm w-50">
        <img src="./assets/image/bin.png" alt="Delete" />
      </button>
    </div>
  </td>
</tr>

`;
}

function getTasks() {
  let result = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(search)
  );
  if (level !== "All") {
    result = result.filter((task) => task.taskLevel === level);
  }
  if (result.length !== 0) {
    tasksTable.innerHTML = "";
    result.map((task, i) => {
      tasksTable.innerHTML += getTaskCard(task, i);
    });
  } else {
    tasksTable.innerHTML = `<td class="text-center" colspan="4">No tasks</td>`;
  }
}

getTasks();

const deleteTask = (id) => {
  console.log(id);

  let check = confirm("Do you want to delete this task ?");
  if (check) {
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getTasks();
  }
};

const editTask = (id) => {
  selected = id;
  addModalBtn.textContent = "Save";
  const { taskName, taskTime, taskLevel } = tasks[id];
  taskForm.taskName.value = taskName;
  taskForm.taskTime.value = taskTime;
  taskForm.taskLevel.value = taskLevel;
};

openModalBtn.addEventListener("click", () => {
  const { taskName, taskTime, taskLevel } = taskForm.elements;
  selected = null;
  addModalBtn.textContent = "Add";
  taskName.value = "";
  taskTime.value = "";
  taskLevel.value = levels[0];
});

console.log(selected);

searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  getTasks();
});

filterLevel.addEventListener("change", function () {
  level = this.value;
  console.log(level);

  getTasks();
});
