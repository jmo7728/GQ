document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");

  const navbar = document.querySelector(".navbar");
  const revealElements = document.querySelectorAll(".reveal, .reveal-card");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => observer.observe(element));
  }
});