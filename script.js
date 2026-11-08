
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. Enable JavaScript-dependent animations
  // ==========================================

  document.body.classList.add("has-js");


  // ==========================================
  // 2. Mobile Navigation
  // ==========================================

  const menuButton = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  function closeNavigation() {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }

  if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation"
      );

      navigation.classList.toggle("is-open", !isOpen);
    });

    // Close menu after clicking a link
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    // Close menu using Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    });

    // Close menu by clicking outside
    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeNavigation();
      }
    });

  }


  // ==========================================
  // 3. Active Navigation Section
  // ==========================================

  const sectionLinks = navigation
    ? [...navigation.querySelectorAll('a[href^="#"]')]
    : [];

  const scrollSections = sectionLinks
    .map((link) =>
      document.getElementById(link.hash.slice(1))
    )
    .filter(Boolean);

  function setActiveSection(sectionId) {
    sectionLinks.forEach((link) => {
      const isActive = link.hash === "#" + sectionId;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveSection(link.hash.slice(1));
    });
  });

  if (
    scrollSections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections[0]) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }

      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.15, 0.4]
      }
    );

    scrollSections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  // ==========================================
  // 4. Smooth Scrolling
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", (event) => {

      const targetId = anchor.getAttribute("href");

      // Ignore empty links
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      // Ignore links without matching sections
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // ==========================================
  // 5. Automatic Footer Year
  // ==========================================

  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });


  // ==========================================
  // 6. Scroll Reveal Animations
  // ==========================================

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  } else {

    // Fallback for older browsers
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  }


  // ==========================================
  // 7. Typing Animation
  // ==========================================

  const roleElement = document.querySelector("#typed-role");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (roleElement && !prefersReducedMotion) {

    const roles = [
      "Web Developer",
      "Web Designer",
      "Backend Developer"
    ];

    let roleIndex = 0;
    let letterIndex = roles[0].length;
    let deleting = true;

    function typeRole() {

      const role = roles[roleIndex];

      roleElement.textContent = role.slice(
        0,
        letterIndex
      );

      if (deleting) {

        letterIndex--;

        if (letterIndex < 0) {

          deleting = false;

          roleIndex =
            (roleIndex + 1) % roles.length;

          letterIndex = 0;

          window.setTimeout(typeRole, 320);

          return;
        }

      } else {

        letterIndex++;

        if (letterIndex > roles[roleIndex].length) {

          deleting = true;

          window.setTimeout(typeRole, 1450);

          return;
        }

      }

      window.setTimeout(
        typeRole,
        deleting ? 43 : 68
      );

    }

    window.setTimeout(typeRole, 1500);

  }


  // ==========================================
  // 8. Contact Form
  // ==========================================

  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const formData = new FormData(contactForm);

      const name = String(
        formData.get("name") || ""
      ).trim();

      const email = String(
        formData.get("email") || ""
      ).trim();

      const message = String(
        formData.get("message") || ""
      ).trim();

      // Validate required fields
      if (!name || !email || !message) {

        alert("Please fill out all required fields.");

        return;
      }

      // Create email draft
      const subject = encodeURIComponent(
        `Portfolio message from ${name}`
      );

      const body = encodeURIComponent(
        `${message}\n\nFrom: ${name}\nEmail: ${email}`
      );

      const mailto =
        `mailto:prempawar241@gmail.com` +
        `?subject=${subject}&body=${body}`;

      window.location.href = mailto;

    });

  }

});
