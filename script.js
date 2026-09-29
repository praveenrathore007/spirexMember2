/* ==========================================================
   SpireX Foundation — MEMBER 2 GLOBAL INTERACTIONS
   Vanilla JavaScript only.
   This file can be reused by Member 3/4/5 pages.
   ========================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  function setMenu(open) {
    if (!header || !toggle || !nav) return;

    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("open"));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (nav.classList.contains("open") && !header.contains(event.target)) {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("open")) {
        setMenu(false);
      }
    });
  }

  /* ---------- Header glass effect on scroll ---------- */
  function updateHeader() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Active page link ----------
     Works automatically when the same JS is reused
     on about.html / internships.html / programs.html / etc. */
  (function setActiveLink() {
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(function (link) {
      const target = link.getAttribute("href").split("#")[0];
      const active = target === currentFile;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  })();

  /* ---------- Scroll reveal ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  /* ---------- Desktop hero tilt ---------- */
  const visual = document.querySelector(".hero-visual");
  const codeCard = document.getElementById("code-card");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (visual && codeCard && finePointer && !reduceMotion) {
    visual.addEventListener("mousemove", function (event) {
      if (window.innerWidth <= 900) return;

      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      codeCard.style.transform =
        "perspective(1200px) rotateY(" +
        (x * 7).toFixed(2) +
        "deg) rotateX(" +
        (-y * 5).toFixed(2) +
        "deg)";
    });

    visual.addEventListener("mouseleave", function () {
      codeCard.style.transform = "";
    });
  }
})();
