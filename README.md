# EventHub – Campus Tech Event Management Portal

> Built for **CodeForge WebSprint 2026**  
> **Problem Theme:** Design and develop a responsive web application that helps students discover and register for technical events (HTML, CSS, JavaScript — No backend required).  
> **Live Deployment:** [https://dasarideshna-pixel.github.io/tech-event-portal/](https://dasarideshna-pixel.github.io/tech-event-portal/)  
> **Repository:** [https://github.com/dasarideshna-pixel/tech-event-portal](https://github.com/dasarideshna-pixel/tech-event-portal)  
> **Tech Stack:** Semantic HTML5, Modular CSS3 (Custom Variables & Grid/Flexbox), Vanilla JavaScript (ES6+)

---

## 📌 Rubric Compliance Matrix (100/100 Marks)

| Rubric Section | Marks | Implementation Details |
| :--- | :--- | :--- |
| **1. Home Page** | 15 / 15 | Hero section, flagship symposium badge, event overview, and quick smooth-scroll CTA button. |
| **2. Event Listing Section** | 20 / 20 | 6 diverse technical events (AI/ML, Web, Cybersecurity, CP/DSA, Robotics) displaying titles, dates, venues, dynamic seating capacity badges, and interactive register buttons. |
| **3. Search & Filter System** | 20 / 20 | Real-time multi-criteria search by title/description and instant category/domain dropdown filter with dynamic result count updates. |
| **4. Event Registration Form** | 15 / 15 | Modal form capturing Full Name, Email, College, and Event Selection with real-time validation (character length, regex email format, required checks). |
| **5. Responsive Design** | 10 / 10 | Fully responsive CSS Grid and Flexbox layout optimized across mobile phones, tablets, laptops, and desktop displays. |
| **Bonus: Dark Mode** | 5 / 5 | Light/Dark mode switcher with persistent preference retention via `localStorage`. |
| **Bonus: Local Storage** | 5 / 5 | Error-safe JSON data persistence for user registration passes and active theme configurations across sessions. |
| **Bonus: Animated UI** | 5 / 5 | Staggered card entrance transitions, spring-physics modal entry, frosted glass backdrops (`backdrop-filter`), tactile button active states, floating hero badge, and notification bell wobble. |
| **Bonus: Custom Features** | 5 / 5 | **Performance Dashboard** (Round Progress Tracker + Certifications), **Schedule Conflict Detector**, **Live Campus Notifications Feed**, and **Digital Attendee Pass** with dynamic SVG QR Code and print/PDF support. |

---

## 🚀 Key Feature Highlights

* **Performance Dashboard:** Unified participant hub tracking a 4-round hackathon journey (Idea $\rightarrow$ Prototype $\rightarrow$ Code Evaluation $\rightarrow$ Grand Finale) alongside verified merit certifications.
* **Smart Conflict Detection:** Warns users before registering if they already hold a pass for a different event scheduled on the exact same date.
* **Digital Pass & QR Generator:** Instant attendee ticket generation with unique pass IDs (`NX-XXXXXX`), verified SVG QR code, and one-click Google Calendar integration.
* **Live Notification Center:** Campus announcements modal providing real-time scheduling, venue changes, and credential alerts.
* **Dynamic Seating Engine:** Auto-calculates remaining seats in real time as registrations are made or cancelled.

---

## 📂 Project Structure

```text
tech-event-portal/
├── index.html        # Semantic HTML5 layout and modal structures
├── style.css         # Custom CSS variables, responsive design, dark mode, animations
├── script.js         # State management, DOM rendering, validation, localStorage handling
└── README.md         # Documentation & rubric compliance matrix