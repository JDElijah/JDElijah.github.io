console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", (!isHidden).toString());
    });
  }
});
