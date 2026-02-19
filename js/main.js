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

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideMenu = mobileMenu.contains(e.target);
      const clickedToggle = toggle.contains(e.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mobileMenu.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});
