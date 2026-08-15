# EventHub – Campus Tech Event Management Portal

A responsive client-side web application built for students to discover, track, and register for technical events, workshops, and hackathons.

* **Live Deployment:** [https://dasarideshna-pixel.github.io/tech-event-portal/](https://dasarideshna-pixel.github.io/tech-event-portal/)
* **Repository:** [https://github.com/dasarideshna-pixel/tech-event-portal](https://github.com/dasarideshna-pixel/tech-event-portal)
* **Built With:** HTML5, CSS3 (Custom Variables, Flexbox, Grid), Modern JavaScript (ES6+)

---

## 🎯 Overview & Problem Statement

University campuses host numerous technical hackathons, symposiums, and guest lectures across multiple domains. Students often struggle to track overlapping event schedules, manage registrations, and access their event credentials in one place. 

**EventHub** solves this by providing a unified, responsive client-side portal featuring real-time event exploration, dynamic seat tracking, schedule conflict detection, and digital ticketing.

---

## ✨ Key Features

### 1. Discovery & Real-Time Filtering
* **Domain Categorization:** Filter across domains including *AI/ML, Web Development, Cybersecurity, CP/DSA,* and *Robotics*.
* **Instant Keyword Search:** Real-time search by event title and overview description.
* **Dynamic Capacity Counters:** Displays real-time remaining seat counts with automatic status changes when capacity is reached.

### 2. Registration & Schedule Conflict Prevention
* **Modal Registration Form:** Captures participant name, email, college, and event selection.
* **Client-Side Validation:** Inline validation checks for format accuracy and required fields.
* **Smart Conflict Detection:** Alerts attendees if they attempt to book multiple events taking place on the same date.

### 3. Digital Ticketing & Attendance
* **Custom SVG QR Passes:** Issues a unique digital ticket (`NX-XXXXXX`) with an SVG QR pass for entrance verification.
* **Calendar Sync:** One-click integration to add scheduled events directly to Google Calendar.
* **Print & Export:** Formatted layout optimized for printing or saving passes as PDF.

### 4. Performance Dashboard & Notifications
* **Hackathon Progress Stepper:** Multi-stage visual progress tracker (Idea Submission $\rightarrow$ Prototype $\rightarrow$ Code Review $\rightarrow$ Grand Finale).
* **Certifications Vault:** Verified archive for certificates of merit and participation credentials.
* **Campus Notification Feed:** Real-time notification panel for venue changes, schedule alerts, and access keys.

### 5. UI/UX & Persistence
* **Theme Switching:** Persistent Dark and Light modes using CSS custom properties.
* **Local Storage Integration:** Persists user registrations and theme preferences across browser sessions without requiring a database backend.
* **Micro-Interactions & Transitions:** Spring-physics modal entrances, frosted glass backdrops (`backdrop-filter`), and staggered card entrances.

---

## 📂 Project Structure

```text
tech-event-portal/
├── index.html        # Semantic HTML structure & modal layouts
├── style.css         # Design system, CSS variables, dark mode, animations
├── script.js         # State management, validation, DOM rendering, localStorage
└── README.md         # Project documentation