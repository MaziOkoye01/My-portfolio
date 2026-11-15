# Personal Academic Portfolio & Student Management Platform

A responsive, multi-page web application built for the **COS 106 (Introduction to Web Technologies)** Practical Term Project at **Miva Open University**. The platform combines a personal software engineering portfolio with an interactive client-side academic task and event planner.

- **Live Website:** [View Live Deployment](https://maziokoye01.github.io/My-portfolio/)
- **Source Repository:** [GitHub Repository](https://github.com/MaziOkoye01/My-portfolio)

---

## Student Details
- **Name:** Okoye Kenneth Somto
- **Matriculation Number:** 2025/C/SENG/0749
- **Program:** B.Sc. Software Engineering (100 Level)
- **Institution:** Miva Open University
- **Course:** COS 106 — Introduction to Web Technologies

---

## Site Architecture (5 Pages)

| Page | File | Key Features |
| :--- | :--- | :--- |
| **Home** | `index.html` | Hero introduction with profile photograph, core engineering competencies, featured design highlights, and quick contact preview. |
| **About Me** | `about.html` | HTML5 `<video>` introduction, educational history, 100-level semester course timetable (`<table>`), career aspirations, technical skills, and hobbies. |
| **Projects** | `projects.html` | Responsive grid showcasing practical academic and software builds with visual previews, tech stack tags, and source/demo links. |
| **Academic Planner** | `planner.html` | Interactive JavaScript task and event manager with priority levels, status filters (`All`, `Pending`, `Completed`), live progress bar, and `localStorage` persistence. |
| **Contact** | `contact.html` | Validated contact form verifying non-empty fields, standard email formatting, and digits-only phone numbers, integrated with **EmailJS** for real-time delivery. |

---

## Technologies Used
- **HTML5:** Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), forms, tables, and embedded multimedia.
- **CSS3:** External stylesheet (`style.css`) featuring CSS custom properties (`:root`), Flexbox, CSS Grid, smooth hover transitions, `@keyframes` animations, and responsive `@media` queries in a dark obsidian and burgundy theme.
- **JavaScript (ES6+):** DOM manipulation, `addEventListener` event handling, `event.preventDefault()` form validation, dynamic UI filtering, `localStorage` state persistence, and EmailJS API integration.

### Responsive Mobile Navigation Drawer
- **Adaptive Breakpoint (`≤ 650px`):** Replaces the desktop horizontal navigation links with a compact three-bar hamburger toggle button (`#menuToggle`) on mobile screens to prevent header wrapping and save viewport space.
- **Interactive State & Accessibility (`script.js`):** Uses DOM event listeners to toggle `.show-menu` visibility, synchronize `aria-expanded` attributes for screen readers, animate the icon into a close (`X`) button, and auto-close the drawer once a page link is tapped.

---

## Project Structure

```text
├── index.html          # Landing page & overview
├── about.html          # Biography, video intro, timetable & skills
├── projects.html       # Software & web development showcase
├── planner.html        # Interactive JavaScript task & event planner
├── contact.html        # Validated contact form with EmailJS

---
This project satisfies all functional and technical criteria specified in the COS 106 Assesment:

- [x] **Multi-Page Navigation:** Consistent 5-page navigation bar (`index.html`, `about.html`, `projects.html`, `planner.html`, `contact.html`) with active page indicators.
- [x] **Semantic HTML5:** Structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- [x] **Tabular & List Data:** Course timetable rendered using `<table>` in `about.html`; navigation, skills, and goals organized with `<ul>` and `<ol>`.
- [x] **Embedded Multimedia:** HTML5 `<video>` introduction on `about.html` plus responsive `<img>` elements with descriptive `alt` attributes across all pages.
- [x] **External Responsive CSS:** Single `style.css` stylesheet using CSS variables, Flexbox, CSS Grid, `@keyframes` animations, and mobile/tablet `@media` breakpoints (`900px` and `650px`).
- [x] **Interactive JavaScript:** Dynamic DOM creation, array filtering, `localStorage` persistence, and client-side form validation using `event.preventDefault()`.

---

## Key Implementation Highlights

- **Persistent Academic Planner (`script.js`):** Stores tasks and academic events in browser `localStorage` under `academicTasks` and `academicEvents` keys, dynamically recalculating task totals and the study completion progress bar without page reloads.
- **Real-Time Contact Validation & Delivery (`contact.html`):** Enforces non-empty inputs, regex email verification (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), and numeric-only phone filtering before dispatching messages via the EmailJS browser SDK.
- **Design System (`style.css`):** Built around an obsidian black (`#0a0a0b`) and deep burgundy (`#800020`) palette paired with `Poppins` typography for accessible contrast across desktop and mobile viewports.

---

## Author & Verification

- **GitHub:** [@MaziOkoye01](https://github.com/MaziOkoye01)
- **Email:** o.kenneth2488@miva.edu.ng
- **Certifications:** Oracle Learning Explorer (Java), AWS Cloud Practitioner Essentials, Digital Transformation with Google Cloud
├── style.css           # Unified responsive stylesheet
├── script.js           # Form validation & planner state logic
└── assets/             # Logos, profile image, video intro & CV PDF
### Dark & Light Mode Theme System
- **CSS Custom Property Overrides (`style.css`):** Built on `:root` design tokens (`--bg-black`, `--bg-dark`, `--bg-card`, `--text-white`, `--gold-tint`), allowing `body.light-mode` to restyle backgrounds, hero overlays, cards, tables, and form inputs seamlessly with smooth `0.3s` color transitions.
- **Cross-Page `localStorage` Persistence (`script.js`):** Listens for clicks on `#themeToggle`, updates the sun/moon icon (`#themeIcon`), and saves the active theme under the `portfolioTheme` key so the selected mode remains consistent when navigating between Home, About, Projects, Planner, and Contact.