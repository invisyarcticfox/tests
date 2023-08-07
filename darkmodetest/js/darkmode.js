let darkMode = localStorage.getItem("darkmode");
const darkModeToggle = document.querySelector("#darkmode-toggle");


const enabledarkMode = () => {
  document.body.classList.add("darkmode");
  darkModeToggle.classList.add("darkmode");
  localStorage.setItem("darkmode", "true");
};
const disabledarkMode = () => {
  document.body.classList.remove("darkmode");
  darkModeToggle.classList.remove("darkmode");
  localStorage.setItem("darkmode", "false");
};

if (darkMode === "true") {
  enabledarkMode();
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "true") {
    enabledarkMode();
    console.log(darkMode);
  } else {
    disabledarkMode();
    console.log(darkMode);
  }
})