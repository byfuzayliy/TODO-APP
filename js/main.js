let filterLevel = document.querySelector("#filter-level");
let selectLevel = document.querySelector("#taskLevel");
let taskForm = document.querySelector(".task-form");
let taskmodal = document.querySelector(".task-modal");
let tasksTable = document.querySelector(".tasks-table tbody");
let tasksJson = localStorage.getItem("tasks");
let tasks = JSON.parse(tasksJson) || [];
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
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    bootstrap.Modal.getInstance(taskmodal).hide();
    getTasks();
  }
});

function getTaskCard({ taskName, taskTime, taskLevel }, i) {
  console.log(taskLevel);

  let levelColor = {
    Low: "info",
    Middle: "warning",
    High: "danger",
  };
  console.log(levelColor);

  return `<tr>
            <th scope="row">${i + 1}</th>
            <td class="text-${levelColor[taskLevel]}">${taskName}</td>
            <td>${taskTime}</td>
            <td>
              <button class="btn btn-primary">
                  <img src="./assets/image/edit.png" alt="" />
                </button>
                <button class="btn btn-danger">
                  <img src="./assets/image/bin.png" alt="" />
                </button>
              </td>
            </tr>`;
}

function getTasks() {
  tasksTable.innerHTML = "";
  tasks.map((task, i) => {
    tasksTable.innerHTML += getTaskCard(task, i);
  });
}

getTasks();
