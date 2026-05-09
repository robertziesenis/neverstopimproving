const sidebar = document.querySelector(".sidebar-container");
sidebar.setAttribute("icon-data", "←");

function toggleSidebar() {
  sidebar.classList.toggle("show");

  if (sidebar.classList.contains("show")) {
    sidebar.setAttribute("icon-data", "→");
  } else {
    sidebar.setAttribute("icon-data", "←");
  }
}

const currentYearCopyright = document.getElementById("current-year-copyright");
const currentYear = new Date().getFullYear();
currentYearCopyright.innerHTML = `© ${currentYear}`;
