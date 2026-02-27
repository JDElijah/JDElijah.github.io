console.log("main.js loaded");

/**
 * Sets the current year in the footer dynamically. 
 */
function initFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/**
 * Handles mobile navigation toggle behavior.
 * - Opens/closes mobile menu 
 * - Updated aria-expanded for accesibility
 * - Closes menu when clicking a link or outside the menu
 */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile");

  if (!toggle || !mobileMenu) return;

  // Toggle menu visibility when hamburger button is clicked
  toggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", (!isHidden).toString());
  });

  // Close menu when a navigation link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside it
  document.addEventListener("click", (e) => {
    const clickedInsideMenu = mobileMenu.contains(e.target);
    const clickedToggle = toggle.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) {
      mobileMenu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Handles contact form submission using AJAX (fetch)
 * Prevents default form redirect and submits data to Formspree
 * in the background. Displays inline success or error messages. 
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-success");
  const errorBox = document.getElementById("contact-error");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hide any previous status messages
    success?.classList.add("hidden");
    errorBox?.classList.add("hidden");

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Disable button + show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const formData = new FormData(form);

      // Send form data to Formspree endpoint
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Clear inputs
        form.reset();

        // Hide form and show success message
        form.classList.add("hidden");
        success?.classList.remove("hidden");
      } else {
        errorBox?.classList.remove("hidden");
      }
    } catch (error) {
      errorBox?.classList.remove("hidden");
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

/**
 * Initialize all interactive components after DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  initFooterYear(); 
  initMobileNav(); 
  initContactForm(); 
});
