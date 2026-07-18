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
   SUPABASE CLIENT INITIALIZATION
   ============================================ */
const supabaseClient = (typeof supabase !== 'undefined') ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ============================================
   CAREER TRACK & PORTAL STATE
   ============================================ */
let activeTrack = localStorage.getItem("careerTrack") || null;
let typingTimeoutId = null;

/* ============================================
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  initNavbar();
  initThemeToggle();
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initContactForm();
  initBackToTop();
  initGatewayPortal();

  // If track is already saved, load it immediately without showing portal
  if (activeTrack) {
    const portal = document.getElementById("gateway-portal");
    const content = document.getElementById("portfolio-content");
    if (portal) portal.style.display = "none";
    if (content) {
      content.style.display = "block";
      content.style.opacity = "1";
    }
    setPortfolioTrack(activeTrack);
  }
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
   CAREER TRACK GATEWAY & PORTAL CONTROL
   ============================================ */
function initGatewayPortal() {
  const btnData = document.getElementById("btn-track-data");
  const btnSoftware = document.getElementById("btn-track-software");
  const toggleBtn = document.getElementById("track-toggle");

  if (btnData) {
    btnData.addEventListener("click", () => selectTrack("data"));
    btnData.addEventListener("keypress", (e) => { if (e.key === "Enter") selectTrack("data"); });
  }
  if (btnSoftware) {
    btnSoftware.addEventListener("click", () => selectTrack("software"));
    btnSoftware.addEventListener("keypress", (e) => { if (e.key === "Enter") selectTrack("software"); });
  }
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextTrack = (activeTrack === "data") ? "software" : "data";
      setPortfolioTrack(nextTrack);
    });
  }
}

function selectTrack(track) {
  const portal = document.getElementById("gateway-portal");
  const content = document.getElementById("portfolio-content");
  
  if (portal) portal.classList.add("gateway-hidden");
  if (content) {
    content.style.display = "block";
    setTimeout(() => {
      content.style.opacity = "1";
    }, 50);
  }
  
  setTimeout(() => {
    if (portal) portal.style.display = "none";
  }, 600);

  setPortfolioTrack(track);
}

function setPortfolioTrack(track) {
  activeTrack = track;
  localStorage.setItem("careerTrack", track);

  // 1. Update switcher button text
  const switcherText = document.getElementById("track-toggle-text");
  if (switcherText) {
    switcherText.innerHTML = (track === "data") 
      ? '<i class="fas fa-chart-bar" aria-hidden="true"></i> Data Mode' 
      : '<i class="fas fa-brain" aria-hidden="true"></i> Dev Mode';
  }

  // 2. Set skills filter class
  const skillsSec = document.getElementById("skills");
  if (skillsSec) {
    skillsSec.className = (track === "data") ? "filter-data" : "filter-software";
  }

  // 3. Update Text Content copy
  const heroBio = document.querySelector(".hero-text p");
  const aboutWhoAmI = document.querySelector(".about-left .glass-card:nth-child(1) p");
  const aboutObjective = document.querySelector(".about-left .glass-card:nth-child(2) p");

  if (track === "data") {
    if (heroBio) {
      heroBio.textContent = "MCA graduate from Lovely Professional University with a strong passion for Data Analytics, Business Intelligence, and Machine Learning. Skilled in Python, SQL, Power BI, and data visualization, with hands-on experience in transforming complex datasets into actionable business insights.";
    }
    if (aboutWhoAmI) {
      aboutWhoAmI.textContent = "I'm Mir Furqaan from Kashmir, a Master of Computer Applications (MCA) graduate from Lovely Professional University. I specialize in Data Analytics, Business Intelligence, Data Visualization, and Machine Learning. I enjoy transforming raw data into meaningful insights that help organizations make informed decisions and improve business performance.";
    }
    if (aboutObjective) {
      aboutObjective.textContent = "Seeking a challenging opportunity as a Data Analyst where I can apply my analytical, technical, and problem-solving skills to extract valuable insights from data, contribute to business growth, and continuously enhance my expertise in data-driven decision making.";
    }
  } else {
    if (heroBio) {
      heroBio.textContent = "MCA graduate from Lovely Professional University with a strong passion for Generative AI development, Software Engineering, and Machine Learning. Skilled in Python, React, SQL, LLMs, and building intelligent full-stack applications that automate processes.";
    }
    if (aboutWhoAmI) {
      aboutWhoAmI.textContent = "I'm Mir Furqaan from Kashmir, a Master of Computer Applications (MCA) graduate from Lovely Professional University. I specialize in Generative AI development, Software Engineering, and Machine Learning. I enjoy building intelligent LLM-powered applications, system architectures, and full-stack solutions.";
    }
    if (aboutObjective) {
      aboutObjective.textContent = "Seeking a challenging opportunity as a Gen AI Developer & Software Engineer where I can apply my cognitive engineering, full-stack development, and machine learning skills to build state-of-the-art AI systems and scale software solutions.";
    }
  }

  // Restart typing effect with new phrases
  initTypingEffect();

  // 4. Load filtered items from database
  loadDynamicProjects();
  loadDynamicCertifications();
  loadDynamicResume();
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
    typingTimeoutId = null;
  }

  const phrases = (activeTrack === "software") ? [
    "Gen AI Developer",
    "Python Developer",
    "SQL Specialist",
    "React Developer",
    "Full-Stack Engineer"
  ] : [
    "Data Analyst",
    "Python Developer",
    "SQL Specialist",
    "Power BI Expert",
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

    typingTimeoutId = setTimeout(tick, delay);
  }

  tick();
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  triggerReveal();
}

function triggerReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if present
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
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

/* ============================================
   SUPABASE DYNAMIC LOADERS
   ============================================ */
async function loadDynamicProjects() {
  if (!activeTrack) return;
  const container = document.getElementById("projects-grid");
  if (!container || !supabaseClient) return;

  const { data, error } = await supabaseClient.from("projects").select("*").order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No projects found. Add them from your admin dashboard!</p>`;
    return;
  }

  // Filter in-memory by track
  const filteredData = data.filter(p => !p.category_track || p.category_track === 'both' || p.category_track === activeTrack);

  if (filteredData.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No projects found for the selected career track.</p>`;
    return;
  }

  container.innerHTML = "";
  filteredData.forEach(p => {
    const tagsHTML = p.tech_stack.map(tag => `<span class="tech-tag">${tag}</span>`).join("");
    
    // Check if demo link is a full URL or a picture
    const isImageDemo = p.demo_url.startsWith("./") || p.demo_url.includes(".jpg") || p.demo_url.includes(".png") || p.demo_url.includes(".webp");
    const demoIcon = isImageDemo ? "fas fa-image" : "fas fa-external-link-alt";
    const demoLabel = isImageDemo ? "View Preview" : "Live Demo";

    const article = document.createElement("article");
    article.className = "project-card reveal";
    article.innerHTML = `
      <div class="project-img-wrap">
        <img
          src="${p.image_url}"
          alt="${p.title} screenshot"
          loading="lazy"
          width="600" height="200"
        />
        <span class="project-badge">${p.badge}</span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-stack">${tagsHTML}</div>
        <div class="project-links">
          <a href="${p.github_url}" target="_blank" rel="noopener noreferrer" class="link-github" aria-label="View ${p.title} on GitHub">
            <i class="fab fa-github" aria-hidden="true"></i> GitHub
          </a>
          <a href="${p.demo_url}" target="_blank" class="link-demo" aria-label="View ${p.title} demo">
            <i class="${demoIcon}" aria-hidden="true"></i> ${demoLabel}
          </a>
        </div>
      </div>
    `;
    container.appendChild(article);
  });
  triggerReveal();
}

async function loadDynamicCertifications() {
  if (!activeTrack) return;
  const container = document.getElementById("certs-grid");
  if (!container || !supabaseClient) return;

  const { data, error } = await supabaseClient.from("certifications").select("*").order("created_at", { ascending: true });

  if (error || !data || data.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No certifications found. Add them from your admin dashboard!</p>`;
    return;
  }

  // Filter in-memory by track
  const filteredData = data.filter(c => !c.category_track || c.category_track === 'both' || c.category_track === activeTrack);

  if (filteredData.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No certifications found for the selected career track.</p>`;
    return;
  }

  container.innerHTML = "";
  filteredData.forEach(c => {
    const card = document.createElement("div");
    card.className = "cert-card reveal";
    card.innerHTML = `
      <div class="cert-icon" aria-hidden="true">${c.icon}</div>
      <div class="cert-info">
        <h4>${c.title}</h4>
        <p>${c.issuer}</p>
        <a href="${c.pdf_url}" target="_blank" rel="noopener noreferrer" aria-label="View ${c.title} certificate">
          View Certificate <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    `;
    container.appendChild(card);
  });
  triggerReveal();
}

async function loadDynamicResume() {
  if (!activeTrack) return;
  if (!supabaseClient) return;

  const { data } = supabaseClient.storage.from("resumes").getPublicUrl("Mir_Furqaan_Hassan_Resume_.pdf");
  
  if (data && data.publicUrl) {
    try {
      const response = await fetch(data.publicUrl, { method: 'HEAD' });
      if (response.ok) {
        document.querySelectorAll(".resume-link").forEach(link => {
          link.href = data.publicUrl;
        });
      }
    } catch (e) {
      console.warn("Storage CV not found or inaccessible, keeping local link.", e);
    }
  }
}
