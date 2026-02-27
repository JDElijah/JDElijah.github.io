console.log("main.js loaded");

function initFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", (!isHidden).toString());
  });

  // Close mobile menu when a link is clicked.
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedToggle = toggle.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) {
      mobileMenu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");
  const errorBox = document.getElementById("contact-error");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    success?.classList.add("hidden");
    errorBox?.classList.add("hidden");

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        form.classList.add("hidden");
        success?.classList.remove("hidden");
      } else {
        errorBox?.classList.remove("hidden");
      }
    } catch (error) {
      errorBox?.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear(); 
  initMobileNav(); 
  initContactForm(); 
});
// document.addEventListener("DOMContentLoaded", () => {
//   // Footer year
//   const year = document.getElementById("year");
//   if (year) year.textContent = new Date().getFullYear();

//   // Mobile nav toggle
//   const toggle = document.getElementById("nav-toggle");
//   const mobileMenu = document.getElementById("nav-mobile");

//   if (toggle && mobileMenu) {
//     toggle.addEventListener("click", () => {
//       const isHidden = mobileMenu.classList.toggle("hidden");
//       toggle.setAttribute("aria-expanded", (!isHidden).toString());
//     });

//     // Close mobile menu when a link is clicked
//     mobileMenu.querySelectorAll("a").forEach((link) => {
//       link.addEventListener("click", () => {
//         mobileMenu.classList.add("hidden");
//         toggle.setAttribute("aria-expanded", "false");
//       });
//     });

//     document.addEventListener("click", (e) => {
//       const clickedInsideMenu = mobileMenu.contains(e.target);
//       const clickedToggle = toggle.contains(e.target);

//       if (!clickedInsideMenu && !clickedToggle) {
//         mobileMenu.classList.add("hidden");
//         toggle.setAttribute("aria-expanded", "false");
//       }
//     });
//   }
// });
