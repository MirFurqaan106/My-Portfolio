/* ============================================
   EMAILJS CONFIGURATION
   Replace the placeholders below with your real credentials from emailjs.com
   ============================================
   PUBLIC KEY  → Dashboard > Account > General
   SERVICE ID  → Email Services tab
   TEMPLATE ID → Email Templates tab
   ============================================ */
const EMAILJS_PUBLIC_KEY  = "9DE2R1sWS_Sfw0vJ5";   // ← Your Public Key
const EMAILJS_SERVICE_ID  = "service_s969psl";        // ← Your Service ID
const EMAILJS_TEMPLATE_ID = "template_nbinywm";       // ← Your Template ID

/* ============================================
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  initNavbar();
  initThemeToggle();
  initMobileMenu();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initContactForm();
  initBackToTop();
});

/* ============================================
   NAVBAR — scroll class + active link
   ============================================ */
function initNavbar() {
  const nav = document.querySelector("nav");
  const links = document.querySelectorAll(".nav-links a, .mobile-menu a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);

    // Active link highlight
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    menu.classList.toggle("open");
  });

  // Close on link click
  document.querySelectorAll(".mobile-menu a").forEach(a => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  const phrases = [
    "Data Analyst",
    "Python Developer",
    "Power BI Expert",
    "SQL Specialist",
    "Data Storyteller"
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.substring(0, ci--) : phrase.substring(0, ci++);

    let delay = deleting ? 60 : 100;

    if (!deleting && ci > phrase.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && ci < 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if present
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ============================================
   SKILL BARS — animate on scroll
   ============================================ */
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar").forEach(bar => {
          bar.style.width = bar.dataset.level;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const grid = document.querySelector(".skills-grid");
  if (grid) observer.observe(grid);
}

/* ============================================
   CONTACT FORM — validation + EmailJS
   ============================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const btn = form.querySelector(".submit-btn");
    const msg = document.getElementById("form-msg");

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    msg.className = "form-msg";

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      msg.textContent = "✅ Message sent successfully! I'll get back to you soon.";
      msg.className = "form-msg success";
      form.reset();
      clearErrors(form);
    } catch (err) {
      console.error("EmailJS error:", err);
      msg.textContent = "❌ Failed to send message. Please try again or email me directly.";
      msg.className = "form-msg fail";
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });

  // Live validation on blur
  form.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll("input[required], textarea[required]").forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const group = field.closest(".form-group");
  const errEl = group?.querySelector(".err-msg");
  let error = "";

  if (!field.value.trim()) {
    error = "This field is required.";
  } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    error = "Please enter a valid email address.";
  }

  if (error) {
    field.classList.add("invalid");
    group?.classList.add("show-err");
    if (errEl) errEl.textContent = error;
    return false;
  } else {
    field.classList.remove("invalid");
    group?.classList.remove("show-err");
    return true;
  }
}

function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  form.querySelectorAll(".show-err").forEach(el => el.classList.remove("show-err"));
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================
   THEME TOGGLE
   ============================================ */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const icon = btn.querySelector("i");
  const currentTheme = localStorage.getItem("theme") || "dark";

  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    icon.className = "fas fa-sun";
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
  });
}
