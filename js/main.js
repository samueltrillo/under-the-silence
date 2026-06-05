(function () {
  "use strict";

  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("section[id]");
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initYouTubeEmbed();

  function initYouTubeEmbed() {
    const iframe = document.getElementById("youtube-player");
    const notice = document.getElementById("video-file-notice");
    if (!iframe) return;

    const videoId = iframe.getAttribute("data-video-id");
    if (!videoId) return;

    if (window.location.protocol === "file:") {
      if (notice) notice.hidden = false;
      return;
    }

    const params = new URLSearchParams({ rel: "0" });
    const origin = window.location.origin;
    if (origin && origin !== "null") {
      params.set("origin", origin);
    }

    iframe.src =
      "https://www.youtube.com/embed/" +
      encodeURIComponent(videoId) +
      "?" +
      params.toString();
  }

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", function (e) {
    if (!nav || !toggle) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      closeNav();
    }
  });

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = "";

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === "#" + current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  if (form && formStatus) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formStatus.textContent = "Gracias. Tu mensaje ha sido registrado (demo local).";
      form.reset();
      setTimeout(function () {
        formStatus.textContent = "";
      }, 5000);
    });
  }
})();
