/* ── DATA ──────────────────────────────────────────────────── */

const students = [
  { name:"Rahul",   id:"101", branch:"CSE", email:"rahul@mail.com",   contact:"9999999999", hostel:"BoysHostel-A",  room:"101", fee:"Paid"    },
  { name:"Ankit",   id:"102", branch:"IT",  email:"ankit@mail.com",   contact:"8888888888", hostel:"BoysHostel-A",  room:"101", fee:"Pending" },
  { name:"Amit",    id:"103", branch:"ME",  email:"amit@mail.com",    contact:"7777777777", hostel:"BoysHostel-A",  room:"101", fee:"Paid"    },
  { name:"Riya",    id:"104", branch:"ECE", email:"riya@mail.com",    contact:"6666666666", hostel:"GirlsHostel-B", room:"202", fee:"Paid"    },
  { name:"Sneha",   id:"105", branch:"CSE", email:"sneha@mail.com",   contact:"5555555555", hostel:"GirlsHostel-B", room:"202", fee:"Pending" },
  { name:"Priya",   id:"106", branch:"CE",  email:"priya@mail.com",   contact:"4444444444", hostel:"GirlsHostel-B", room:"202", fee:"Pending" },
  { name:"Karan",   id:"107", branch:"CSE", email:"karan@mail.com",   contact:"3333333333", hostel:"BoysHostel-C",  room:"103", fee:"Paid"    },
  { name:"Rohit",   id:"108", branch:"IT",  email:"rohit@mail.com",   contact:"2222222222", hostel:"BoysHostel-C",  room:"103", fee:"Pending" },
  { name:"Arjun",   id:"109", branch:"ME",  email:"arjun@mail.com",   contact:"1111111111", hostel:"BoysHostel-C",  room:"103", fee:"Paid"    },
  { name:"Neha",    id:"110", branch:"ECE", email:"neha@mail.com",    contact:"9999999990", hostel:"GirlsHostel-A", room:"104", fee:"Pending" },
  { name:"Pooja",   id:"111", branch:"CSE", email:"pooja@mail.com",   contact:"8888888880", hostel:"GirlsHostel-A", room:"104", fee:"Paid"    },
  { name:"Isha",    id:"112", branch:"CE",  email:"isha@mail.com",    contact:"7777777770", hostel:"GirlsHostel-A", room:"104", fee:"Pending" },
  { name:"Vikram",  id:"113", branch:"ME",  email:"vikram@mail.com",  contact:"6666666660", hostel:"BoysHostel-D",  room:"105", fee:"Paid"    },
  { name:"Aditya",  id:"114", branch:"CSE", email:"aditya@mail.com",  contact:"5555555550", hostel:"BoysHostel-D",  room:"105", fee:"Pending" },
  { name:"Manish",  id:"115", branch:"IT",  email:"manish@mail.com",  contact:"4444444440", hostel:"BoysHostel-D",  room:"105", fee:"Paid"    },
  { name:"Simran",  id:"116", branch:"ECE", email:"simran@mail.com",  contact:"3333333330", hostel:"GirlsHostel-C", room:"106", fee:"Pending" },
  { name:"Ananya",  id:"117", branch:"CSE", email:"ananya@mail.com",  contact:"2222222220", hostel:"GirlsHostel-C", room:"106", fee:"Paid"    },
  { name:"Kritika", id:"118", branch:"CE",  email:"kritika@mail.com", contact:"1111111110", hostel:"GirlsHostel-C", room:"106", fee:"Pending" },
  { name:"Rahul2",  id:"119", branch:"ME",  email:"rahul2@mail.com",  contact:"9999999988", hostel:"BoysHostel-E",  room:"107", fee:"Paid"    },
  { name:"Aman",    id:"120", branch:"CSE", email:"aman@mail.com",    contact:"8888888877", hostel:"BoysHostel-E",  room:"107", fee:"Pending" },
];

const rooms = [
  { room:"101", members:["Rahul","Ankit","Amit"]   },
  { room:"202", members:["Riya","Sneha","Priya"]   },
  { room:"103", members:["Karan","Rohit","Arjun"]  },
  { room:"104", members:["Neha","Pooja","Isha"]    },
  { room:"105", members:["Vikram","Aditya","Manish"]},
  { room:"106", members:["Simran","Ananya","Kritika"]},
  { room:"107", members:["Rahul2","Aman"]          },
];

/* ── HELPERS ───────────────────────────────────────────────── */

const AV_CLASSES = ["av-info","av-green","av-amber","av-red"];
function avClass(name) { return AV_CLASSES[name.charCodeAt(0) % 4]; }

function findByName(name) {
  return students.find(s => s.name.toLowerCase() === name.toLowerCase().trim());
}

function findById(id) {
  return students.find(s => s.id === id.trim());
}

function findRoommates(roomNo) {
  const rd = rooms.find(r => r.room === roomNo);
  if (!rd) return [];
  return rd.members.map(m => students.find(s => s.name === m)).filter(Boolean);
}

function getStats() {
  const total   = students.length;
  const paid    = students.filter(s => s.fee === "Paid").length;
  const pending = total - paid;
  const roomsCount = rooms.length;
  return { total, paid, pending, rooms: roomsCount };
}

/* ── ICON SVG STRINGS ──────────────────────────────────────── */

const ICONS = {
  users:   `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  check:   `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock:   `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  home:    `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`,
  info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  warn:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bolt:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fork:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  recycle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  drop:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  wash:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M8 7h.01M12 7h.01"/></svg>`,
  globe:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  sun:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>`,
  wind:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 12c-2-2.5-2-6 0-7s5 .5 5 3c.5 2-2 3.5-5 4z"/><path d="M12 12c2.5 2 6 2 7 0s-.5-5-3-5c-2-.5-3.5 2-4 5z"/><path d="M12 12c2 2.5 2 6 0 7s-5-.5-5-3c-.5-2 2-3.5 5-4z"/><path d="M12 12c-2.5-2-6-2-7 0s.5 5 3 5c2 .5 3.5-2 4-5z"/><circle cx="12" cy="12" r="1.5"/></svg>`,
};

/* ── HTML BUILDERS ─────────────────────────────────────────── */

function pageHeader(title, sub) {
  return `<div class="ph"><h2>${title}</h2><p>${sub}</p><hr></div>`;
}

function infoBanner(msg, warn = false) {
  const icon = warn ? ICONS.warn : ICONS.info;
  return `<div class="info-banner ${warn ? "warn" : ""}">${icon}<span>${msg}</span></div>`;
}

function badge(fee) {
  return `<span class="badge ${fee === "Paid" ? "badge-paid" : "badge-pending"}">${fee}</span>`;
}

function studentTable(list) {
  if (!list.length) return infoBanner("No records found.");
  const rows = list.map(s => `
    <tr>
      <td style="color:var(--text);font-weight:600">${s.name}</td>
      <td>${s.id}</td>
      <td>${s.branch}</td>
      <td style="color:var(--text3)">${s.email}</td>
      <td>${s.hostel}</td>
      <td>${s.room}</td>
      <td>${badge(s.fee)}</td>
    </tr>`).join("");

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>ID</th><th>Branch</th>
            <th>Email</th><th>Hostel</th><th>Room</th><th>Fee status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function profileCard(s) {
  const isPaid = s.fee === "Paid";
  return `
    <div class="profile-card">
      <div class="profile-top">
        <div class="av ${avClass(s.name)} profile-top-av" style="width:50px;height:50px;font-size:20px">
          ${s.name[0].toUpperCase()}
        </div>
        <div style="flex:1">
          <div class="profile-name">${s.name}</div>
          <div class="profile-meta">Scholar ID: ${s.id} &nbsp;·&nbsp; ${s.branch}</div>
        </div>
        ${badge(s.fee)}
      </div>
      <div class="profile-divider"></div>
      <div class="field-grid">
        <div class="field-item"><label>Email</label><span>${s.email}</span></div>
        <div class="field-item"><label>Contact</label><span>${s.contact}</span></div>
        <div class="field-item"><label>Hostel</label><span>${s.hostel}</span></div>
        <div class="field-item"><label>Room no.</label><span>${s.room}</span></div>
      </div>
    </div>`;
}

/* ── NAVIGATION ────────────────────────────────────────────── */

function nav(index) {
  document.querySelectorAll(".panel").forEach((p, i) =>
    p.classList.toggle("active", i === index));
  document.querySelectorAll(".nav-item").forEach((n, i) =>
    n.classList.toggle("active", i === index));
  document.getElementById("main").scrollTop = 0;
}

/* ── PANEL: DASHBOARD ──────────────────────────────────────── */

function initDashboard() {
  const { total, paid, pending, rooms: roomsCount } = getStats();

  const cards = [
    { label:"Total students", value: total,      icon: ICONS.users, bg:"var(--blue-dim)",   color:"var(--blue-text)"   },
    { label:"Fee paid",       value: paid,       icon: ICONS.check, bg:"var(--green-dim)",  color:"var(--green-text)"  },
    { label:"Fee pending",    value: pending,    icon: ICONS.clock, bg:"var(--amber-dim)",  color:"var(--amber-text)"  },
    { label:"Total rooms",    value: roomsCount, icon: ICONS.home,  bg:"var(--purple-dim)", color:"var(--purple-text)" },
  ];

  const cardHTML = cards.map(c => `
    <div class="stat-card">
      <div class="stat-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-label">${c.label}</div>
    </div>`).join("");

  document.getElementById("p0").innerHTML = `
    ${pageHeader("Dashboard", "Hostel overview at a glance")}
    <div class="stat-grid">${cardHTML}</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px">
      <span style="font-size:15px;font-weight:700;color:var(--text)">All students</span>
      <span class="text-muted">${total} records</span>
    </div>
    ${studentTable(students)}`;
}

/* ── PANEL: STUDENTS ───────────────────────────────────────── */

function initStudents() {
  document.getElementById("p1").innerHTML = `
    ${pageHeader("Students", "Search student records by name")}
    <div class="search-card">
      <label>Student name</label>
      <div class="input-row">
        <input id="s-in" type="text" placeholder="e.g. Rahul" style="width:260px">
        <button onclick="doStudentSearch()">Search</button>
      </div>
    </div>
    <div id="s-res">${infoBanner("Type a student name and press Search.")}</div>`;

  document.getElementById("s-in")
    .addEventListener("keydown", e => { if (e.key === "Enter") doStudentSearch(); });
}

function doStudentSearch() {
  const val = document.getElementById("s-in").value.trim();
  if (!val) { document.getElementById("s-res").innerHTML = infoBanner("Please enter a name."); return; }
  const s = findByName(val);
  document.getElementById("s-res").innerHTML = s
    ? profileCard(s)
    : infoBanner(`No student found with name "${val}".`, true);
}

/* ── PANEL: ROOMS ──────────────────────────────────────────── */

function initRooms() {
  document.getElementById("p2").innerHTML = `
    ${pageHeader("Rooms", "Find room allocation and roommates by Scholar ID")}
    <div class="search-card">
      <label>Scholar ID</label>
      <div class="input-row">
        <input id="r-in" type="text" placeholder="e.g. 101" style="width:180px">
        <button onclick="doRoomSearch()">Search</button>
      </div>
    </div>
    <div id="r-res">${infoBanner("Enter a Scholar ID to view room details and roommates.")}</div>`;

  document.getElementById("r-in")
    .addEventListener("keydown", e => { if (e.key === "Enter") doRoomSearch(); });
}

function doRoomSearch() {
  const val = document.getElementById("r-in").value.trim();
  if (!val) { document.getElementById("r-res").innerHTML = infoBanner("Please enter a Scholar ID."); return; }
  const s = findById(val);
  if (!s) { document.getElementById("r-res").innerHTML = infoBanner(`No student with Scholar ID "${val}".`, true); return; }
  const mates = findRoommates(s.room);

  document.getElementById("r-res").innerHTML = `
    <div class="room-banner">
      <div class="room-banner-icon">${ICONS.home.replace('stroke="currentColor"','stroke="#2dd4bf"')}</div>
      <div>
        <div class="room-banner-num">Room ${s.room}</div>
        <div class="room-banner-meta">${s.hostel} &nbsp;·&nbsp; ${mates.length} occupant${mates.length !== 1 ? "s" : ""}</div>
      </div>
    </div>
    <div class="section-label">Roommates</div>
    ${studentTable(mates)}`;
}

/* ── PANEL: FEE STATUS ─────────────────────────────────────── */

function initFees() {
  document.getElementById("p3").innerHTML = `
    ${pageHeader("Fee status", "Check hostel fee payment status by Scholar ID")}
    <div class="search-card">
      <label>Scholar ID</label>
      <div class="input-row">
        <input id="f-in" type="text" placeholder="e.g. 101" style="width:180px">
        <button onclick="doFeeSearch()">Check status</button>
      </div>
    </div>
    <div id="f-res">${infoBanner("Enter a Scholar ID to check fee payment status.")}</div>`;

  document.getElementById("f-in")
    .addEventListener("keydown", e => { if (e.key === "Enter") doFeeSearch(); });
}

function doFeeSearch() {
  const val = document.getElementById("f-in").value.trim();
  if (!val) { document.getElementById("f-res").innerHTML = infoBanner("Please enter a Scholar ID."); return; }
  const s = findById(val);
  if (!s) { document.getElementById("f-res").innerHTML = infoBanner(`No student with Scholar ID "${val}".`, true); return; }

  const isPaid = s.fee === "Paid";
  const statusIcon = isPaid ? ICONS.check : ICONS.clock;

  document.getElementById("f-res").innerHTML = `
    <div class="profile-card">
      <div class="profile-top">
        <div class="av ${avClass(s.name)}" style="width:50px;height:50px;font-size:20px">
          ${s.name[0].toUpperCase()}
        </div>
        <div>
          <div class="profile-name">${s.name}</div>
          <div class="profile-meta">ID: ${s.id} &nbsp;·&nbsp; ${s.branch} &nbsp;·&nbsp; ${s.hostel}</div>
        </div>
      </div>
      <div class="profile-divider"></div>
      <div style="font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">
        Payment status
      </div>
      <div class="fee-status-pill ${isPaid ? "paid" : "pending"}">
        ${statusIcon}
        ${s.fee}
      </div>
    </div>`;
}

/* ── PANEL: COMPLAINTS ─────────────────────────────────────── */

const COMP_CATS = [
  { id:"elec",  label:"Electricity", sub:"LAN · light · fan issues",   icon: ICONS.bolt,    bg:"var(--amber-dim)",  color:"var(--amber-text)",  border:"var(--amber)"  },
  { id:"food",  label:"Food",        sub:"Mess quality concerns",       icon: ICONS.fork,    bg:"var(--red-dim)",    color:"var(--red-text)",    border:"var(--red)"    },
  { id:"hygiene",label:"Hygiene",    sub:"Cleanliness & sanitation",    icon: ICONS.recycle, bg:"var(--green-dim)",  color:"var(--green-text)",  border:"var(--green)"  },
  { id:"water", label:"Water",       sub:"Supply or quality issues",    icon: ICONS.drop,    bg:"var(--blue-dim)",   color:"var(--blue-text)",   border:"var(--blue)"   },
  { id:"wash",  label:"Washing",     sub:"Washing machine problems",    icon: ICONS.wash,    bg:"var(--purple-dim)", color:"var(--purple-text)", border:"var(--purple)" },
];

function initComplaints() {
  const cardHTML = COMP_CATS.map(c => `
    <div class="comp-card" style="border-left-color:${c.border}" onclick="showCompDetail('${c.id}')">
      <div class="comp-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div>
      <div class="comp-title">${c.label}</div>
      <div class="comp-sub">${c.sub}</div>
      <div class="comp-link-text" style="color:${c.color}">File complaint &rsaquo;</div>
    </div>`).join("");

  document.getElementById("p4").innerHTML = `
    ${pageHeader("Complaints", "Select a category to file your complaint")}
    <div class="comp-grid">${cardHTML}</div>
    <div id="comp-det"></div>`;
}

function showCompDetail(id) {
  const det = document.getElementById("comp-det");
  det.innerHTML = "";

  if (id === "elec") {
    det.innerHTML = `
      <div class="detail-card">
        <h4>Electricity — select sub-category</h4>
        <div class="sub-grid">
          <div class="sub-card" onclick="showElecLink('LAN issue','lan-form')">
            ${ICONS.globe}<div class="sub-card-name">LAN issue</div>
          </div>
          <div class="sub-card" onclick="showElecLink('Light issue','light-form')">
            ${ICONS.sun}<div class="sub-card-name">Light issue</div>
          </div>
          <div class="sub-card" onclick="showElecLink('Fan issue','fan-form')">
            ${ICONS.wind}<div class="sub-card-name">Fan issue</div>
          </div>
        </div>
        <div id="elec-link"></div>
      </div>`;

  } else if (id === "hygiene") {
    det.innerHTML = `
      <div class="detail-card">
        <h4>Hygiene — get floor contact</h4>
        <div class="input-row">
          <label style="font-size:13px;color:var(--text3)">Floor number</label>
          <input id="flr-in" type="number" min="1" max="20" placeholder="e.g. 3" style="width:110px">
          <button onclick="getFloorContact()">Get contact</button>
        </div>
        <div id="flr-res" class="mt-12"></div>
      </div>`;

  } else {
    const labels = { food:"Food", water:"Water", wash:"Washing machine" };
    det.innerHTML = `
      <div class="detail-card">
        <h4>File a ${labels[id]} complaint</h4>
        <p style="font-size:13px;color:var(--text3);margin-bottom:14px">Describe your issue and submit to hostel administration.</p>
        <textarea rows="4" placeholder="Describe the issue in detail..."></textarea>
        <div class="mt-12">
          <button onclick="submitComplaint(this)">Submit complaint</button>
        </div>
        <div id="comp-ok"></div>
      </div>`;
  }

  det.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showElecLink(name, slug) {
  const link = `https://hostel.edu/forms/${slug}`;
  document.getElementById("elec-link").innerHTML = `
    <div class="link-result">
      <div class="link-title">${name} form link</div>
      <div class="link-url">${link}</div>
    </div>`;
}

function getFloorContact() {
  const val = document.getElementById("flr-in").value.trim();
  const res = document.getElementById("flr-res");
  if (!val || isNaN(val) || val < 1) {
    res.innerHTML = infoBanner("Please enter a valid floor number.", true);
    return;
  }
  res.innerHTML = `
    <div class="link-result">
      <div class="link-title">Floor ${val} — cleaning staff</div>
      <div class="link-url">Contact: +91 98765 43210</div>
    </div>`;
}

function submitComplaint(btn) {
  btn.disabled = true;
  const ok = document.getElementById("comp-ok");
  ok.innerHTML = `<div class="success-banner">Complaint submitted successfully. The hostel administration will respond within 24 hours.</div>`;
  ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ── BOOT ──────────────────────────────────────────────────── */

initDashboard();
initStudents();
initRooms();
initFees();
initComplaints();
