(function () {
  "use strict";

  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("section[id]");
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const yearEl = document.getElementById("year");
  let spotifyPlay = null;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initYouTubeEmbed();
  initSpotify();

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

  function initSpotify() {
    initSpotifyFloat();
    initSpotifyPlayer();
  }

  function initSpotifyFloat() {
    const widget = document.getElementById("spotify-float");
    const collapseBtn = widget && widget.querySelector(".spotify-float-toggle");
    const expandBtn = widget && widget.querySelector(".spotify-float-fab");
    if (!widget || !collapseBtn || !expandBtn) return;

    function setCollapsed(collapsed) {
      widget.classList.toggle("is-collapsed", collapsed);
      collapseBtn.setAttribute("aria-expanded", String(!collapsed));
      collapseBtn.setAttribute(
        "aria-label",
        collapsed ? "Expandir reproductor" : "Minimizar reproductor"
      );
      collapseBtn.querySelector("span").textContent = collapsed ? "+" : "−";
      expandBtn.hidden = !collapsed;
    }

    collapseBtn.addEventListener("click", function () {
      setCollapsed(!widget.classList.contains("is-collapsed"));
    });

    expandBtn.addEventListener("click", function () {
      setCollapsed(false);
      if (spotifyPlay) spotifyPlay();
    });
  }

  function initSpotifyPlayer() {
    const host = document.getElementById("spotify-embed-host");
    if (!host) return;

    const spotifyUri =
      host.getAttribute("data-spotify-uri") || "spotify:track:56pt6rcbiorpYUP3x4EEre";
    let controller = null;

    spotifyPlay = function () {
      if (controller) controller.play();
    };

    function bindAutoplayFallback() {
      const resume = function () {
        spotifyPlay();
      };

      document.addEventListener("click", resume, { once: true });
      document.addEventListener("keydown", resume, { once: true });
      document.addEventListener("touchstart", resume, { once: true, passive: true });
    }

    window.onSpotifyIframeApiReady = function (IFrameAPI) {
      IFrameAPI.createController(
        host,
        {
          width: "100%",
          height: "152",
          uri: spotifyUri,
          theme: "dark",
        },
        function (embedController) {
          controller = embedController;
          spotifyPlay();
        }
      );
    };

    if (!document.querySelector("script[data-spotify-iframe-api]")) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.setAttribute("data-spotify-iframe-api", "");
      document.body.appendChild(script);
    }

    bindAutoplayFallback();
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
