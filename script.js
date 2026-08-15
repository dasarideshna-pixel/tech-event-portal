// Sample Event Data
const eventList = [
  {
    id: "e101",
    title: "National Hackathon 2026",
    category: "Web",
    date: "2026-09-20",
    venue: "Main Audi, Ground Floor",
    description: "24-hour sprint to build solutions using Web and API integration."
  },
  {
    id: "e102",
    title: "Intro to LLMs & Neural Networks",
    category: "AI/ML",
    date: "2026-09-25",
    venue: "CSE Seminar Hall",
    description: "Hands-on workshop covering transformer architectures and model fine-tuning."
  },
  {
    id: "e103",
    title: "Capture The Flag (CTF) Challenge",
    category: "Cybersecurity",
    date: "2026-10-02",
    venue: "Computer Lab 4",
    description: "Test your skills in cryptography, binary analysis, and web security."
  },
  {
    id: "e104",
    title: "Speed Coding & Algorithms Contest",
    category: "Competitive Programming",
    date: "2026-10-05",
    venue: "Online / CodePlatform",
    description: "Solve algorithmic problems under time constraints. DSA focused."
  },
  {
    id: "e105",
    title: "Autonomous Drone & Robotics Expo",
    category: "Robotics",
    date: "2026-10-12",
    venue: "Mechanical Workshop Quad",
    description: "Showcase of quadcopters, micro-controllers, and embedded ROS systems."
  },
  {
    id: "e106",
    title: "Deep Dive into Data Pipelines",
    category: "AI/ML",
    date: "2026-10-18",
    venue: "Virtual Room A",
    description: "Building scalable ingestion and preprocessing pipelines with Python."
  }
];

// Persistent state
let userRegistrations = JSON.parse(localStorage.getItem("event_registrations")) || [];

// DOM references
const eventsContainer = document.getElementById("events-container");
const searchBar = document.getElementById("search-bar");
const categorySelect = document.getElementById("category-select");
const eventsCount = document.getElementById("events-count");
const noEventsMsg = document.getElementById("no-events-msg");
const regBadge = document.getElementById("reg-badge");

// Modal elements
const modalBackdrop = document.getElementById("modal-backdrop");
const registeredBackdrop = document.getElementById("registered-backdrop");
const regForm = document.getElementById("reg-form");
const modalTitle = document.getElementById("modal-title");
const formEventId = document.getElementById("form-event-id");
const registeredList = document.getElementById("registered-list");

// Theme
const themeBtn = document.getElementById("theme-btn");
const toast = document.getElementById("toast-message");

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  renderEvents();
  updateBadge();
});

// Theme Management
function setupTheme() {
  const currentTheme = localStorage.getItem("app_theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {
  const active = document.documentElement.getAttribute("data-theme");
  const target = active === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", target);
  localStorage.setItem("app_theme", target);
  themeBtn.textContent = target === "dark" ? "☀️" : "🌙";
});

// Render Event Cards
function renderEvents() {
  const search = searchBar.value.toLowerCase().trim();
  const selectedCat = categorySelect.value;

  const filtered = eventList.filter(item => {
    const matchQuery = item.title.toLowerCase().includes(search) || 
                       item.description.toLowerCase().includes(search);
    const matchCategory = selectedCat === "All" || item.category === selectedCat;
    return matchQuery && matchCategory;
  });

  eventsContainer.innerHTML = "";
  eventsCount.textContent = `Showing ${filtered.length} of ${eventList.length} events`;

  if (filtered.length === 0) {
    noEventsMsg.style.display = "block";
    return;
  }
  noEventsMsg.style.display = "none";

  filtered.forEach(evt => {
    const isRegistered = userRegistrations.some(r => r.eventId === evt.id);
    
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div>
        <div class="card-header-row">
          <span class="tag">${evt.category}</span>
          <span class="event-date-badge">${evt.date}</span>
        </div>
        <h3>${evt.title}</h3>
        <p>${evt.description}</p>
      </div>
      <div>
        <div class="card-footer">
          <span class="venue-info">📍 ${evt.venue}</span>
          <button 
            class="btn ${isRegistered ? 'btn-disabled' : 'btn-primary'}" 
            ${isRegistered ? 'disabled' : ''} 
            onclick="openRegisterModal('${evt.id}')">
            ${isRegistered ? 'Registered' : 'Register'}
          </button>
        </div>
      </div>
    `;
    eventsContainer.appendChild(card);
  });
}

// Event Listeners for Filters
searchBar.addEventListener("input", renderEvents);
categorySelect.addEventListener("change", renderEvents);

// Modal Operations
function openRegisterModal(id) {
  const targetEvent = eventList.find(e => e.id === id);
  if (!targetEvent) return;

  formEventId.value = targetEvent.id;
  modalTitle.textContent = `Register: ${targetEvent.title}`;
  clearErrors();
  regForm.reset();
  modalBackdrop.style.display = "flex";
}

document.getElementById("close-modal-btn").addEventListener("click", () => {
  modalBackdrop.style.display = "none";
});

document.getElementById("close-reg-modal-btn").addEventListener("click", () => {
  registeredBackdrop.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) modalBackdrop.style.display = "none";
  if (e.target === registeredBackdrop) registeredBackdrop.style.display = "none";
});

// Form Validation and Submission
regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const nameInput = document.getElementById("user-name").value.trim();
  const emailInput = document.getElementById("user-email").value.trim();
  const collegeInput = document.getElementById("user-college").value.trim();
  const eventId = formEventId.value;

  let isValid = true;

  if (nameInput.length < 3) {
    document.getElementById("name-err").textContent = "Please enter your full name (minimum 3 characters).";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput)) {
    document.getElementById("email-err").textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (collegeInput.length < 2) {
    document.getElementById("college-err").textContent = "Please provide your college name.";
    isValid = false;
  }

  if (!isValid) return;

  // Store registration
  userRegistrations.push({
    eventId: eventId,
    name: nameInput,
    email: emailInput,
    college: collegeInput,
    time: new Date().toLocaleDateString()
  });

  localStorage.setItem("event_registrations", JSON.stringify(userRegistrations));

  modalBackdrop.style.display = "none";
  showToast("Registration saved successfully!");
  updateBadge();
  renderEvents();
});

function clearErrors() {
  document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
}

// "My Registrations" Drawer
document.getElementById("view-registered-btn").addEventListener("click", () => {
  registeredList.innerHTML = "";

  if (userRegistrations.length === 0) {
    registeredList.innerHTML = "<p class='empty-state'>You have not registered for any events yet.</p>";
  } else {
    userRegistrations.forEach(item => {
      const match = eventList.find(e => e.id === item.eventId);
      if (!match) return;

      const row = document.createElement("div");
      row.className = "reg-row";
      row.innerHTML = `
        <div>
          <div class="reg-row-title">${match.title}</div>
          <div class="reg-row-date">Date: ${match.date} | Venue: ${match.venue}</div>
        </div>
        <button class="btn-remove" onclick="cancelRegistration('${match.id}')">Cancel</button>
      `;
      registeredList.appendChild(row);
    });
  }

  registeredBackdrop.style.display = "flex";
});

function cancelRegistration(id) {
  userRegistrations = userRegistrations.filter(r => r.eventId !== id);
  localStorage.setItem("event_registrations", JSON.stringify(userRegistrations));
  updateBadge();
  renderEvents();
  document.getElementById("view-registered-btn").click();
  showToast("Registration cancelled.");
}

function updateBadge() {
  regBadge.textContent = userRegistrations.length;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
}