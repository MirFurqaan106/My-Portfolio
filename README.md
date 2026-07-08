# Mir Furkaan — Data Analyst Portfolio

A premium, fully responsive portfolio website built with vanilla HTML, CSS, and JavaScript.

## Live Demo
> Deploy to GitHub Pages: Settings → Pages → Branch: `main` / `root`

---

## Project Structure

```
My Portfolio/
│
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles (dark luxury theme)
├── script.js           ← All JavaScript (animations, form, typing)
│
├── assets/
│   ├── images/         ← Section / OG images
│   ├── icons/          ← Custom icons (if any)
│   └── resume/         ← Place Mir_Furkaan_Resume.pdf here
│
└── README.md
```

---

## Features

- Dark luxury glassmorphism design
- Animated typing effect (hero)
- Scroll-reveal fade-in animations
- Skill bar progress animations
- Fully responsive (mobile → 4K)
- Mobile hamburger navigation
- EmailJS contact form with validation
- Back-to-top button
- Semantic HTML + ARIA accessibility

---

## EmailJS Setup

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an **Email Service** → copy the **Service ID**
3. Create an **Email Template** → copy the **Template ID**
   - Template must use variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Go to **Account → General** → copy your **Public Key**
5. Open `script.js` and update the top three constants:

```js
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

---

## Resume

Place your resume PDF at:
```
assets/resume/Mir_Furkaan_Resume.pdf
```

---

## Customisation Checklist

- [ ] Replace profile image URL in `index.html` (hero section `<img>`)
- [ ] Update GitHub / LinkedIn / Instagram links throughout
- [ ] Update email address in contact section and footer
- [ ] Add real project GitHub URLs and Live Demo links
- [ ] Update certificate credential links
- [ ] Place `Mir_Furkaan_Resume.pdf` in `assets/resume/`
- [ ] Set EmailJS credentials in `script.js`

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, responsive layout |
| JavaScript (ES6+) | Interactivity, typing effect, form handling |
| EmailJS | Contact form email delivery |
| Font Awesome 6 | Icons |
| Google Fonts (Poppins) | Typography |

---

© 2025 Mir Furkaan
