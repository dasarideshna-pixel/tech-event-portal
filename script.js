// Master Event Data (6 Diverse Technical Events)
const eventList = [
  {
    id: "e101",
    title: "National Hackathon 2026",
    category: "Web",
    date: "2026-09-20",
    time: "09:00",
    venue: "Main Audi, Ground Floor",
    totalSeats: 50,
    description: "24-hour sprint to build solutions using Web, Microservices, and API integrations."
  },
  {
    id: "e102",
    title: "Intro to LLMs & Neural Networks",
    category: "AI/ML",
    date: "2026-09-25",
    time: "10:00",
    venue: "CSE Seminar Hall",
    totalSeats: 30,
    description: "Hands-on workshop covering transformer architectures and model fine-tuning techniques."
  },
  {
    id: "e103",
    title: "Capture The Flag (CTF) Challenge",
    category: "Cybersecurity",
    date: "2026-10-02",
    time: "11:30",
    venue: "Computer Lab 4",
    totalSeats: 25,
    description: "Test your offensive and defensive skills in cryptography, binary reverse engineering, and web security."
  },
  {
    id: "e104",
    title: "Speed Coding & Algorithms Contest",
    category: "Competitive Programming",
    date: "2026-10-05",
    time: "14:00",
    venue: "Online / CodePlatform",
    totalSeats: 100,
    description: "Solve competitive algorithmic challenges under strict time constraints. DSA focused."
  },
  {
    id: "e105",
    title: "Autonomous Drone & Robotics Expo",
    category: "Robotics",
    date: "2026-10-12",
    time: "09:30",
    venue: "Mechanical Workshop Quad",
    totalSeats: 40,
    description: "Live showcase of quadcopters, micro-controllers, and embedded ROS vision systems."
  },
  {
    id: "e106",
    title: "Deep Dive into Data Pipelines",
    category: "AI/ML",
    date: "2026-10-18",
    time: "15:00",
    venue: "Virtual Room A",
    totalSeats: 35,
    description: "Building scalable ingestion, automated ETL, and predictive preprocessing pipelines with Python."
  }
];

// Persistent State from LocalStorage
let userRegistrations = JSON.parse(localStorage.getItem("event_registrations")) || [];

// DOM References
const eventsContainer = document.getElementById("events-container");
const searchBar = document.getElementById("search-bar");
const categorySelect = document.getElementById("category-select");
const eventsCount = document.getElementById("events-count");
const noEventsMsg = document.getElementById("no-events-msg");
const regBadge = document.getElementById("reg-badge");

// Modals
const modalBackdrop = document.getElementById("modal-backdrop");
const registeredBackdrop = document.getElementById("registered-backdrop");
const passBackdrop = document.getElementById("pass-backdrop");
const passContent = document.getElementById("pass-content");
const regForm = document.getElementById("reg-form");
const modalTitle = document.getElementById("modal-title");
const eventSelectField = document.getElementById("event-select-field");
const registeredList = document.getElementById("registered-list");

// Theme & Notifications
const themeBtn = document.getElementById("theme-btn");
const toast = document.getElementById("toast-message");

// Initialize on Load
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

// Capacity Calculation
function getRemainingSeats(eventId, total) {
  const taken = userRegistrations.filter(r => r.eventId === eventId).length;
  return Math.max(0, total - taken);
}

// Render Event Cards Grid
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
    const seatsLeft = getRemainingSeats(evt.id, evt.totalSeats);
    const isSoldOut = seatsLeft === 0;

    let seatBadgeClass = "seat-badge";
    if (isSoldOut) seatBadgeClass += " sold-out";
    else if (seatsLeft <= 5) seatBadgeClass += " seat-low";

    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div>
        <div class="card-header-row">
          <span class="tag">${evt.category}</span>
          <span class="${seatBadgeClass}">${isSoldOut ? 'Sold Out' : seatsLeft + ' seats left'}</span>
        </div>
        <h3>${evt.title}</h3>
        <p>${evt.description}</p>
      </div>
      <div>
        <div class="card-footer">
          <span class="venue-info">📅 ${evt.date} | 📍 ${evt.venue.split(",")[0]}</span>
          <button 
            class="btn ${isRegistered || isSoldOut ? 'btn-disabled' : 'btn-primary'}" 
            ${isRegistered || isSoldOut ? 'disabled' : ''} 
            onclick="openRegisterModal('${evt.id}')">
            ${isRegistered ? 'Registered' : isSoldOut ? 'Full' : 'Register'}
          </button>
        </div>
      </div>
    `;
    eventsContainer.appendChild(card);
  });
}

// Search and Filter Listeners
searchBar.addEventListener("input", renderEvents);
categorySelect.addEventListener("change", renderEvents);

// Schedule Conflict Checker
function checkScheduleConflict(targetEventId) {
  const targetEvent = eventList.find(e => e.id === targetEventId);
  if (!targetEvent) return null;

  const conflictingReg = userRegistrations.find(reg => {
    const regEvent = eventList.find(e => e.id === reg.eventId);
    return regEvent && regEvent.date === targetEvent.date && regEvent.id !== targetEvent.id;
  });

  if (conflictingReg) {
    const conflictEvent = eventList.find(e => e.id === conflictingReg.eventId);
    return conflictEvent ? conflictEvent.title : null;
  }
  return null;
}

// Modal Handlers
function populateEventDropdown(selectedId) {
  eventSelectField.innerHTML = "";
  eventList.forEach(evt => {
    const opt = document.createElement("option");
    opt.value = evt.id;
    opt.textContent = `${evt.title} (${evt.date})`;
    if (evt.id === selectedId) opt.selected = true;
    eventSelectField.appendChild(opt);
  });
}

function openRegisterModal(id) {
  populateEventDropdown(id);
  const targetEvent = eventList.find(e => e.id === id);
  if (!targetEvent) return;

  modalTitle.textContent = `Register: ${targetEvent.title}`;
  clearErrors();
  regForm.reset();
  populateEventDropdown(id);

  // Evaluate conflict warning
  const conflict = checkScheduleConflict(id);
  const existingWarning = document.getElementById("conflict-alert");
  if (existingWarning) existingWarning.remove();

  if (conflict) {
    const warningDiv = document.createElement("div");
    warningDiv.id = "conflict-alert";
    warningDiv.className = "conflict-warning";
    warningDiv.innerHTML = `⚠️ <strong>Time Slot Warning:</strong> You already hold a pass for <em>"${conflict}"</em> on this date.`;
    regForm.prepend(warningDiv);
  }

  modalBackdrop.style.display = "flex";
}

// Listen to dropdown changes inside modal to update conflict warning dynamically
eventSelectField.addEventListener("change", (e) => {
  const newId = e.target.value;
  const conflict = checkScheduleConflict(newId);
  const existingWarning = document.getElementById("conflict-alert");
  if (existingWarning) existingWarning.remove();

  if (conflict) {
    const warningDiv = document.createElement("div");
    warningDiv.id = "conflict-alert";
    warningDiv.className = "conflict-warning";
    warningDiv.innerHTML = `⚠️ <strong>Time Slot Warning:</strong> You already hold a pass for <em>"${conflict}"</em> on this date.`;
    regForm.prepend(warningDiv);
  }
});

document.getElementById("close-modal-btn").addEventListener("click", () => modalBackdrop.style.display = "none");
document.getElementById("close-reg-modal-btn").addEventListener("click", () => registeredBackdrop.style.display = "none");
document.getElementById("close-pass-btn").addEventListener("click", () => passBackdrop.style.display = "none");

window.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) modalBackdrop.style.display = "none";
  if (e.target === registeredBackdrop) registeredBackdrop.style.display = "none";
  if (e.target === passBackdrop) passBackdrop.style.display = "none";
});

// Form Validation & Submission
regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const nameInput = document.getElementById("user-name").value.trim();
  const emailInput = document.getElementById("user-email").value.trim();
  const collegeInput = document.getElementById("user-college").value.trim();
  const eventId = eventSelectField.value;

  let isValid = true;

  if (nameInput.length < 3) {
    document.getElementById("name-err").textContent = "Name must be at least 3 characters.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput)) {
    document.getElementById("email-err").textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (collegeInput.length < 2) {
    document.getElementById("college-err").textContent = "College name is required.";
    isValid = false;
  }

  if (!isValid) return;

  // Generate a random ticket pass identifier
  const passId = "NX-" + Math.floor(100000 + Math.random() * 900000);

  userRegistrations.push({
    passId: passId,
    eventId: eventId,
    name: nameInput,
    email: emailInput,
    college: collegeInput,
    registeredOn: new Date().toLocaleDateString()
  });

  localStorage.setItem("event_registrations", JSON.stringify(userRegistrations));

  modalBackdrop.style.display = "none";
  showToast("Registration confirmed! Digital pass generated.");
  updateBadge();
  renderEvents();
});

function clearErrors() {
  document.querySelectorAll(".error-text").forEach(el => el.textContent = "");
}

// Google Calendar URL Generator
function getGoogleCalendarUrl(evt) {
  const startDateTime = evt.date.replace(/-/g, "") + "T090000Z";
  const endDateTime = evt.date.replace(/-/g, "") + "T170000Z";
  const title = encodeURIComponent(evt.title);
  const details = encodeURIComponent(evt.description);
  const location = encodeURIComponent(evt.venue);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`;
}

// QR Code SVG Generator
function generatePassQR(passId) {
  return `
    <div class="qr-box">
      <svg width="86" height="86" viewBox="0 0 100 100" shape-rendering="crispEdges">
        <rect width="100" height="100" fill="#ffffff" />
        <rect x="10" y="10" width="30" height="30" fill="#000000" />
        <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
        <rect x="20" y="20" width="10" height="10" fill="#000000" />
        <rect x="60" y="10" width="30" height="30" fill="#000000" />
        <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
        <rect x="70" y="20" width="10" height="10" fill="#000000" />
        <rect x="10" y="60" width="30" height="30" fill="#000000" />
        <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
        <rect x="20" y="70" width="10" height="10" fill="#000000" />
        <rect x="45" y="15" width="6" height="6" fill="#000000" />
        <rect x="50" y="30" width="6" height="6" fill="#000000" />
        <rect x="45" y="45" width="12" height="12" fill="#000000" />
        <rect x="65" y="55" width="8" height="8" fill="#000000" />
        <rect x="80" y="75" width="8" height="8" fill="#000000" />
        <rect x="50" y="75" width="6" height="6" fill="#000000" />
      </svg>
      <div style="font-size:0.65rem; color:#555; text-align:center; font-family:monospace; margin-top:2px;">
        ${passId}
      </div>
    </div>
  `;
}

// Digital Pass Viewer
window.viewDigitalPass = function(passId) {
  const reg = userRegistrations.find(r => r.passId === passId);
  if (!reg) return;
  const evt = eventList.find(e => e.id === reg.eventId);
  if (!evt) return;

  passContent.innerHTML = `
    <div class="ticket-header">
      <h4>${evt.title}</h4>
      <div class="ticket-id">Pass ID: ${reg.passId}</div>
    </div>
    <div class="ticket-details">
      <p><strong>Attendee:</strong> ${reg.name}</p>
      <p><strong>Email:</strong> ${reg.email}</p>
      <p><strong>Institute:</strong> ${reg.college}</p>
      <p><strong>Date & Venue:</strong> ${evt.date} | ${evt.venue}</p>
      <p><strong>Issued On:</strong> ${reg.registeredOn}</p>
    </div>
    <div class="ticket-qr-section">
      ${generatePassQR(reg.passId)}
    </div>
  `;

  registeredBackdrop.style.display = "none";
  passBackdrop.style.display = "flex";
};

// "My Passes" View
document.getElementById("view-registered-btn").addEventListener("click", () => {
  registeredList.innerHTML = "";

  if (userRegistrations.length === 0) {
    registeredList.innerHTML = "<p class='empty-state'>You have not registered for any events yet.</p>";
  } else {
    userRegistrations.forEach(item => {
      const match = eventList.find(e => e.id === item.eventId);
      if (!match) return;

      const calUrl = getGoogleCalendarUrl(match);

      const row = document.createElement("div");
      row.className = "reg-row";
      row.innerHTML = `
        <div>
          <div class="reg-row-title">${match.title}</div>
          <div class="reg-row-date">Pass: ${item.passId} | Date: ${match.date}</div>
          <div class="reg-row-actions">
            <button class="btn btn-secondary btn-sm" onclick="viewDigitalPass('${item.passId}')">🎫 View Pass</button>
            <a class="btn btn-secondary btn-sm" href="${calUrl}" target="_blank" rel="noopener noreferrer">📅 Add to Cal</a>
            <button class="btn-remove btn-sm" onclick="cancelRegistration('${item.passId}')">Cancel</button>
          </div>
        </div>
      `;
      registeredList.appendChild(row);
    });
  }

  registeredBackdrop.style.display = "flex";
});

function cancelRegistration(passId) {
  userRegistrations = userRegistrations.filter(r => r.passId !== passId);
  localStorage.setItem("event_registrations", JSON.stringify(userRegistrations));
  updateBadge();
  renderEvents();
  document.getElementById("view-registered-btn").click();
  showToast("Registration pass cancelled.");
}

function updateBadge() {
  regBadge.textContent = userRegistrations.length;
}

// Client-side CSV Exporter
document.getElementById("export-csv-btn").addEventListener("click", () => {
  if (userRegistrations.length === 0) {
    showToast("No registrations found to export.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Pass ID,Event Name,Date,Venue,Attendee Name,Email,College,Issued Date\r\n";

  userRegistrations.forEach(r => {
    const evt = eventList.find(e => e.id === r.eventId);
    const eventName = evt ? `"${evt.title.replace(/"/g, '""')}"` : "N/A";
    const eventDate = evt ? evt.date : "N/A";
    const eventVenue = evt ? `"${evt.venue.replace(/"/g, '""')}"` : "N/A";

    const row = [
      r.passId,
      eventName,
      eventDate,
      eventVenue,
      `"${r.name}"`,
      `"${r.email}"`,
      `"${r.college}"`,
      r.registeredOn || new Date().toLocaleDateString()
    ].join(",");

    csvContent += row + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `event_attendees_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Attendee roster exported successfully!");
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
}