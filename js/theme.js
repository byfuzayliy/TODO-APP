const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Saqlangan mavzuni tekshirish
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  // Foydalanuvchi tanlovini saqlash
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
