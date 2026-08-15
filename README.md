# EventHub – Campus Tech Event Management Portal

A feature-rich, client-side web application designed for students to discover, track, bookmark, and register for campus technical events, workshops, and hackathons.

* **Live Deployment:** [https://dasarideshna-pixel.github.io/tech-event-portal/](https://dasarideshna-pixel.github.io/tech-event-portal/)
* **Source Repository:** [https://github.com/dasarideshna-pixel/tech-event-portal](https://github.com/dasarideshna-pixel/tech-event-portal)
* **Built With:** HTML5, Modular CSS3 (Custom Variables, Grid & Flexbox), Vanilla JavaScript (ES6+)

---

## 🎯 Overview & Problem Statement

College campuses host numerous hackathons, coding contests, and technical symposiums across diverse domains. Students frequently encounter overlapping schedules, fragmented registration processes, and difficulties in managing their tickets and achievements.

**EventHub** addresses this challenge by providing a centralized portal featuring real-time event discovery, dynamic countdowns, schedule conflict alerts, bookmarking, digital ticketing with QR verification, and a comprehensive performance tracking dashboard.

---

## ✨ Feature Highlights

### 1. Discovery, Filtering & Sorting
* **Multi-Criteria Search & Highlights:** Real-time search with dynamic keyword text highlighting across event titles and descriptions.
* **Domain Categorization:** Instant filtering across domains including *AI/ML, Web Development, Cybersecurity, CP/DSA,* and *Robotics*.
* **Multi-Attribute Sorting:** Sort events dynamically by *Earliest Date*, *Fewest Seats Left (Popularity)*, or *Alphabetical (A–Z)*.
* **Live Event Countdown Timers:** Active ticking timers on every card indicating days and hours remaining until launch.
* **Wishlist / Bookmark System:** Save events for later with persistent star toggles and quick filter switching.

### 2. Registration & Schedule Conflict Prevention
* **Modal Registration Form:** Captures participant Full Name, Email, College, and Event Selection.
* **Input Validation:** Client-side validation for character length, institute entry, and standard email formats.
* **Schedule Conflict Detection:** Real-time warning algorithm preventing students from double-booking overlapping events scheduled on the exact same date.

### 3. Digital Ticketing & Attendance
* **Dynamic SVG QR Code Passes:** Generates unique attendee pass IDs (`NX-XXXXXX`) with custom vector QR codes for check-in verification.
* **Calendar Sync:** One-click integration with Google Calendar.
* **Print & PDF Support:** Print-optimized styling for saving offline PDF credentials.

### 4. Performance Dashboard & Campus Updates
* **Hackathon Progress Stepper:** Visual tracking across 4 competition milestones (*Idea Submission $\rightarrow$ Prototype Demo $\rightarrow$ Code Evaluation $\rightarrow$ Grand Finale*).
* **Certifications Vault:** Showcase of verified badges, rankings, and credentials.
* **Live Campus Notification Center:** Updates feed for schedule alerts, venue changes, and server credentials.

### 5. UI/UX, Animations & Persistence
* **Theme Switching:** Persistent Dark and Light modes powered by CSS custom properties.
* **Local Storage Integration:** Safe JSON state management for registration passes, bookmarked items, and theme configurations across sessions.
* **Spring-Physics Animations:** Staggered card entrances, frosted-glass modal backdrops (`backdrop-filter`), tactile button active states, and floating badges.
* **Interactive FAQ:** Expandable accordion addressing participation rules, eligibility, and ticketing.
* **Web Share API:** Native mobile sharing sheet and desktop clipboard link integration.

---

## 📂 Project Architecture

```text
tech-event-portal/
├── index.html        # Semantic HTML layout, modals, and templates
├── style.css         # CSS design system, dark mode tokens, keyframe animations
├── script.js         # State management, DOM engines, validation, Web APIs
└── README.md         # Comprehensive project documentation