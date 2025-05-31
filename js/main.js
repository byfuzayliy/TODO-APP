let filterLevel = document.querySelector("#filter-level");
let selectLevel = document.querySelector("#select-level");

filterLevel.innerHTML += `<option>All</option>`;

levels.map((level) => {
  filterLevel.innerHTML += `<option>${level}</option>`;
  selectLevel.innerHTML += `<option>${level}</option>`;
});
