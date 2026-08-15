# Nexus Tech | Campus Event Management Portal

A modern, responsive web application designed for discovering, filtering, and registering for campus technical events, workshops, and hackathons. Built using clean, native web standards with zero third-party dependencies.

## 🚀 Live Demo
- **Live Deployment:** [View Application](https://dasarideshna-pixel.github.io/tech-event-portal/)

---

## ✨ Features

- **Dynamic Event Grid:** Renders technical events dynamically from structured JSON data.
- **Multi-parameter Search & Filter:** Real-time search by keywords combined with category-based dropdown filtering.
- **Interactive Registration System:** Modal-based registration form featuring client-side regular expression validation.
- **State Persistence:**
  - Saves registered tickets locally via browser `local Storage`.
  - Persists Dark/Light theme preferences across user sessions.
- **Attendee Pass Manager:** Dedicated "My Registrations" view allowing users to track registered events and cancel passes dynamically.
- **Responsive & Accessible Design:** Handcrafted CSS grid and flexbox layout adapted for mobile, tablet, and desktop viewports.

---

## 🛠️ Built With

- **HTML5:** Semantic markup structure and modal dialog elements.
- **CSS3:** Custom CSS properties (variables), media queries, and responsive grid system.
- **JavaScript (ES6+):** Dynamic DOM manipulation, array methods (`filter`, `map`, `some`), and Local Storage API.

---

## 📂 Project Structure

```text
tech-event-portal/
├── index.html       # Semantic page markup and modal structures
├── style.css        # Theme variables, responsive layouts, and animations
├── script.js        # Core event filtering, validation, and storage logic
└── README.md        # Project documentation
