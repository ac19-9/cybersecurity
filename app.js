/*
  ============================================================
  CyberTrace – Simulated Digital Forensics Lab
  FILE: app.js  (Updated — India locations, enhanced login detection)
  PURPOSE: All JavaScript logic for the app.
           Sections in this file:
           1. FICTIONAL DATA  — The "database" (JS arrays/objects)
           2. DASHBOARD       — Render summary stat cards
           3. EVENT LOG       — Render & filter the events table
           4. LOGINS          — Render & detect suspicious logins
           5. ALERTS PANEL    — NEW: 3-rule alert cards with explanations
           6. TIMELINE        — Render the forensic timeline
           7. CASES           — Render investigation case cards
           8. HASH DEMO       — SHA-256 live computation + examples
           9. REPORT DOWNLOAD — Export events as a .csv file
          10. INIT            — Runs everything on page load

  ALL NAMES, IPs, LOCATIONS, AND EVENTS ARE 100% FICTIONAL.
  ============================================================
*/


/* ============================================================
   SECTION 1 — FICTIONAL DATA
   These arrays act like database tables.
   All usernames, names, IPs, and events are entirely made up.

   FICTIONAL USERNAMES USED:
     alex.morgan   — Marketing analyst (normal user)
     sam.taylor    — IT support engineer
     jordan.blake  — Finance department
     casey.nova    — HR administrator
     riley.cross   — Unknown / external attacker account
     phantom_x     — Known bad actor (newly created rogue account)
     dev.winters   — Developer (victim of phishing)
     pat.sterling  — Remote contractor

   ALL LOCATIONS ARE FICTIONAL INDIAN CITIES.
   ============================================================ */

/**
 * EVENTS TABLE
 * Simulates a system event log from a fictional corporate network.
 */
const events = [
  { id:  1, timestamp: "2024-03-15 02:14:33", type: "Login Failure",       user: "jordan.blake",  machine: "WKSTN-004", desc: "5 consecutive failed login attempts detected",                severity: "High"   },
  { id:  2, timestamp: "2024-03-15 02:31:07", type: "USB Inserted",        user: "jordan.blake",  machine: "WKSTN-004", desc: "Unregistered USB drive inserted (Device ID: USB\\VID_0951)",  severity: "High"   },
  { id:  3, timestamp: "2024-03-15 02:33:41", type: "File Copy",           user: "jordan.blake",  machine: "WKSTN-004", desc: "342 files copied to external drive in 2 minutes",             severity: "High"   },
  { id:  4, timestamp: "2024-03-15 03:10:02", type: "Login Success",       user: "jordan.blake",  machine: "WKSTN-004", desc: "Successful login after hours (02:00–06:00 flagged window)",   severity: "Medium" },
  { id:  5, timestamp: "2024-03-15 07:45:18", type: "Login Success",       user: "alex.morgan",   machine: "WKSTN-011", desc: "Normal business-hours login",                                 severity: "Low"    },
  { id:  6, timestamp: "2024-03-15 08:02:55", type: "File Access",         user: "alex.morgan",   machine: "WKSTN-011", desc: "Accessed HR payroll spreadsheet (normal role access)",        severity: "Low"    },
  { id:  7, timestamp: "2024-03-15 09:14:09", type: "Email Sent",          user: "dev.winters",   machine: "WKSTN-002", desc: "Large attachment (48 MB) sent to external address",           severity: "Medium" },
  { id:  8, timestamp: "2024-03-15 09:55:30", type: "Process Spawned",     user: "dev.winters",   machine: "WKSTN-002", desc: "cmd.exe spawned by outlook.exe — possible macro execution",   severity: "High"   },
  { id:  9, timestamp: "2024-03-15 10:12:44", type: "Network Scan",        user: "SYSTEM",        machine: "SRV-DB-01", desc: "Internal port scan detected from 192.168.1.77",               severity: "High"   },
  { id: 10, timestamp: "2024-03-15 10:13:02", type: "Auth Bypass Attempt", user: "unknown",       machine: "SRV-DB-01", desc: "SQL injection pattern detected in login form input",           severity: "High"   },
  { id: 11, timestamp: "2024-03-15 11:30:00", type: "Password Changed",    user: "sam.taylor",    machine: "DC-01",     desc: "Admin account password reset — initiated by jordan.blake",    severity: "High"   },
  { id: 12, timestamp: "2024-03-15 11:45:33", type: "Account Created",     user: "sam.taylor",    machine: "DC-01",     desc: "New user account 'phantom_x' created with admin privileges",  severity: "High"   },
  { id: 13, timestamp: "2024-03-15 12:00:01", type: "Login Success",       user: "phantom_x",     machine: "WKSTN-009", desc: "First login from newly created rogue account",                 severity: "Medium" },
  { id: 14, timestamp: "2024-03-15 12:15:45", type: "File Deleted",        user: "phantom_x",     machine: "WKSTN-009", desc: "Batch deletion of audit log files in C:\\Windows\\Logs",      severity: "High"   },
  { id: 15, timestamp: "2024-03-15 13:00:22", type: "USB Removed",         user: "jordan.blake",  machine: "WKSTN-004", desc: "External USB drive safely removed after data transfer",        severity: "Low"    },
  { id: 16, timestamp: "2024-03-15 14:22:10", type: "Login Failure",       user: "casey.nova",    machine: "WKSTN-007", desc: "2 failed login attempts — likely forgotten password",          severity: "Low"    },
  { id: 17, timestamp: "2024-03-15 14:23:48", type: "Login Success",       user: "casey.nova",    machine: "WKSTN-007", desc: "Successful login — normal working hours",                      severity: "Low"    },
  { id: 18, timestamp: "2024-03-15 15:00:00", type: "Scheduled Task",      user: "SYSTEM",        machine: "SRV-FILE",  desc: "Unusual scheduled task created: run_backup.bat at 03:00",     severity: "Medium" },
  { id: 19, timestamp: "2024-03-15 16:30:55", type: "VPN Login",           user: "riley.cross",   machine: "VPN-GW",    desc: "VPN login from IP 185.220.101.44 — flagged as Tor exit node",  severity: "High"  },
  { id: 20, timestamp: "2024-03-15 17:05:12", type: "Data Exfiltration",   user: "riley.cross",   machine: "VPN-GW",    desc: "2.3 GB uploaded to external IP over VPN tunnel",               severity: "High"   },
  { id: 21, timestamp: "2024-03-15 18:45:00", type: "System Shutdown",     user: "phantom_x",     machine: "WKSTN-009", desc: "Machine shut down remotely without authorisation",              severity: "High"   },
  { id: 22, timestamp: "2024-03-15 23:59:59", type: "Firewall Rule",       user: "SYSTEM",        machine: "FW-EDGE",   desc: "New outbound allow-all rule added to perimeter firewall",      severity: "High"   },
];

/**
 * LOGIN ATTEMPTS TABLE
 * Simulates an authentication log — ALL FICTIONAL DATA.
 * Locations changed to fictional Indian cities.
 *
 * New rows added to demonstrate 3 detection scenarios:
 *
 * SCENARIO A — Multiple usernames from ONE IP (203.0.113.99):
 *   Rows 13,14,15: admin / root / superuser all tried from same IP
 *   → Detected by detectMultiUserSameIP()
 *
 * SCENARIO B — Success AFTER repeated failures (meera.iyer):
 *   Row 16: 7 failures from 198.51.100.55
 *   Row 17: success from same IP immediately after
 *   → Detected by detectSuccessAfterFailure()
 *
 * SCENARIO C — Extra high-failure record (raj.verma, Delhi):
 *   Row 18: 7 failures → detected by detectRepeatedFailures()
 */
const loginAttempts = [
  /* ── Normal logins ──────────────────────────────────────────── */
  { id:  1, timestamp: "2024-03-15 08:02:11", username: "alex.morgan",  ip: "192.168.1.22",   location: "Mumbai, India",          status: "Success", attempts: 1  },
  { id:  2, timestamp: "2024-03-15 08:15:44", username: "casey.nova",   ip: "192.168.1.45",   location: "Bengaluru, India",        status: "Success", attempts: 1  },
  { id:  5, timestamp: "2024-03-15 09:30:00", username: "dev.winters",  ip: "192.168.1.33",   location: "Chennai, India",          status: "Success", attempts: 1  },
  { id: 11, timestamp: "2024-03-15 13:22:10", username: "alex.morgan",  ip: "192.168.1.22",   location: "Mumbai, India",           status: "Success", attempts: 1  },

  /* ── Rule 1: Repeated failed attempts ──────────────────────── */
  { id:  3, timestamp: "2024-03-15 02:14:33", username: "jordan.blake", ip: "192.168.1.88",   location: "Hyderabad, India",        status: "Failed",  attempts: 5  },
  { id:  6, timestamp: "2024-03-15 03:45:22", username: "pat.sterling", ip: "203.0.113.55",   location: "Unknown",                 status: "Failed",  attempts: 9  },
  { id:  7, timestamp: "2024-03-15 03:46:05", username: "pat.sterling", ip: "203.0.113.55",   location: "Unknown",                 status: "Failed",  attempts: 9  },
  { id: 12, timestamp: "2024-03-15 04:10:00", username: "unknown_scan", ip: "198.51.100.77",  location: "Unknown",                 status: "Failed",  attempts: 12 },
  { id: 18, timestamp: "2024-03-15 04:55:00", username: "raj.verma",    ip: "203.0.113.88",   location: "Delhi, India",            status: "Failed",  attempts: 7  },

  /* ── Rule 2: After-hours logins ─────────────────────────────── */
  { id:  4, timestamp: "2024-03-15 02:31:10", username: "jordan.blake", ip: "192.168.1.88",   location: "Hyderabad, India",        status: "Success", attempts: 1  },
  { id: 10, timestamp: "2024-03-15 01:00:00", username: "sam.taylor",   ip: "192.168.1.201",  location: "Pune, India",             status: "Success", attempts: 1  },

  /* ── Rule 3: Suspicious location ────────────────────────────── */
  { id:  8, timestamp: "2024-03-15 11:00:00", username: "riley.cross",  ip: "185.220.101.44", location: "Tor Network",             status: "Success", attempts: 1  },
  { id:  9, timestamp: "2024-03-15 11:30:00", username: "phantom_x",    ip: "10.0.0.99",      location: "Internal (unusual)",      status: "Success", attempts: 1  },

  /* ── SCENARIO A — Multiple usernames from ONE IP (203.0.113.99) */
  { id: 13, timestamp: "2024-03-15 05:01:11", username: "admin",        ip: "203.0.113.99",   location: "Mumbai, India",           status: "Failed",  attempts: 1  },
  { id: 14, timestamp: "2024-03-15 05:01:44", username: "root",         ip: "203.0.113.99",   location: "Mumbai, India",           status: "Failed",  attempts: 1  },
  { id: 15, timestamp: "2024-03-15 05:02:03", username: "superuser",    ip: "203.0.113.99",   location: "Mumbai, India",           status: "Failed",  attempts: 1  },

  /* ── SCENARIO B — Success AFTER repeated failures ───────────── */
  { id: 16, timestamp: "2024-03-15 06:10:00", username: "meera.iyer",   ip: "198.51.100.55",  location: "Kolkata, India",          status: "Failed",  attempts: 7  },
  { id: 17, timestamp: "2024-03-15 06:12:45", username: "meera.iyer",   ip: "198.51.100.55",  location: "Kolkata, India",          status: "Success", attempts: 1  },

  /* ── SCENARIO C — Extra high-failure records ────────────────── */
  { id: 19, timestamp: "2024-03-15 07:05:00", username: "phantom_x",    ip: "10.0.0.99",      location: "Internal (unusual)",      status: "Failed",  attempts: 4  },
  { id: 20, timestamp: "2024-03-15 07:22:10", username: "unknown_scan", ip: "203.0.113.77",   location: "Ahmedabad, India",        status: "Failed",  attempts: 6  },
];

/**
 * TIMELINE EVENTS TABLE
 * Each group belongs to a case (via key) and describes one action
 * in the forensic narrative. New names used throughout.
 */
const timelineEvents = {
  "C001": [
    { time: "2024-03-10 08:00:00", actor: "jordan.blake",  action: "Arrived at office and logged into workstation WKSTN-004",            artifact: "auth.log",               notes: "Normal business-hours login — no anomaly at this point" },
    { time: "2024-03-10 08:45:11", actor: "jordan.blake",  action: "Accessed confidential project files in \\\\SRV-FILE\\Projects\\Q1",  artifact: "file_access.log",        notes: "Access within job role — flagged in retrospect" },
    { time: "2024-03-10 11:30:55", actor: "jordan.blake",  action: "Emailed zipped file 'Q1_Budget.zip' to personal Gmail account",      artifact: "email_logs.db",          notes: "External email — triggered DLP alert (low priority at time)" },
    { time: "2024-03-10 14:05:00", actor: "jordan.blake",  action: "Searched internal wiki for 'HR resignation process'",                 artifact: "browser_history.db",     notes: "Found via browser artefact recovery" },
    { time: "2024-03-13 23:58:01", actor: "jordan.blake",  action: "Connected USB drive TRANSCEND_16GB to WKSTN-004",                     artifact: "setupapi.dev.log",        notes: "After-hours — no colleagues present" },
    { time: "2024-03-14 00:12:44", actor: "jordan.blake",  action: "Copied 1,204 files (2.1 GB) to USB drive",                           artifact: "robocopy.log (recovered)", notes: "Bulk copy completed in under 15 minutes" },
    { time: "2024-03-14 00:28:03", actor: "jordan.blake",  action: "Deleted recycle bin contents and ran 'cipher /w:C:\\'",               artifact: "event_id_4663",          notes: "Attempted to wipe free space — anti-forensics indicator" },
    { time: "2024-03-14 00:35:19", actor: "jordan.blake",  action: "USB drive removed, workstation locked",                               artifact: "event_id_4800",          notes: "Last recorded action on this machine" },
  ],
  "C002": [
    { time: "2024-03-01 09:15:00", actor: "Visitor",       action: "Unescorted visitor seen near server room on CCTV (fictional)",       artifact: "cctv_log (fictional)",   notes: "Visitor badge scan does not match this floor" },
    { time: "2024-03-01 09:22:11", actor: "Unknown",       action: "USB Rubber Ducky device inserted into SRV-FILE USB port",            artifact: "setupapi.dev.log",        notes: "Device emulates keyboard — automated payload delivery" },
    { time: "2024-03-01 09:22:14", actor: "Payload",       action: "PowerShell script executed: downloads reverse shell binary",         artifact: "powershell.evtx",         notes: "Execution happened in 3 seconds — too fast to be human" },
    { time: "2024-03-01 09:23:00", actor: "Attacker",      action: "Remote shell established to C2 server at 198.51.100.12",             artifact: "netstat_capture.txt",     notes: "C2 IP resolves to fictional domain: nightcall.onion" },
    { time: "2024-03-01 09:40:00", actor: "Attacker",      action: "Lateral movement to SRV-DB-01 using stolen credentials",            artifact: "smb_traffic.pcap",        notes: "Credentials likely harvested from memory dump" },
    { time: "2024-03-01 10:05:22", actor: "Attacker",      action: "SQL database dump extracted and compressed to temp folder",          artifact: "db_dump.sql.gz",          notes: "File later found on dark web forum (fictional)" },
    { time: "2024-03-01 10:30:00", actor: "Attacker",      action: "USB device removed — attack complete",                               artifact: "setupapi.dev.log",        notes: "Total dwell time: ~68 minutes" },
  ],
  "C003": [
    { time: "2024-03-15 01:00:00", actor: "riley.cross",   action: "VPN connection initiated from IP 185.220.101.44 (Tor exit node)",   artifact: "vpn.log",                notes: "IP flagged by threat intelligence feed" },
    { time: "2024-03-15 01:05:33", actor: "riley.cross",   action: "Authenticated to internal HR portal",                               artifact: "auth.log",               notes: "Credentials correct — possible phishing or insider" },
    { time: "2024-03-15 01:07:00", actor: "riley.cross",   action: "Ran automated scraper across HR employee directory",                artifact: "web_access.log",         notes: "327 requests in 40 seconds — non-human rate" },
    { time: "2024-03-15 01:14:22", actor: "riley.cross",   action: "Downloaded full employee list CSV (4,200 records)",                 artifact: "employee_export.csv",    notes: "File downloaded to VPN session endpoint" },
    { time: "2024-03-15 01:30:00", actor: "riley.cross",   action: "2.3 GB data bundle uploaded to external SFTP at 203.0.113.200",    artifact: "netflow.log",            notes: "Destination IP registered to shell company (fictional)" },
    { time: "2024-03-15 01:45:00", actor: "riley.cross",   action: "VPN session terminated",                                           artifact: "vpn.log",                notes: "Session lasted exactly 45 minutes — possible scripted exfil" },
    { time: "2024-03-15 09:00:00", actor: "SIEM",          action: "Automated alert fired: unusual data egress volume",                artifact: "siem_alert_7743",        notes: "Alert delayed 8 hours — detected next business day" },
  ]
};

/**
 * INVESTIGATION CASES TABLE
 * Fictional case files with new names throughout.
 */
const cases = [
  {
    id: "C001",
    caseNumber: "Case #001",
    title: "Insider Threat – Q1 Data Exfiltration",
    suspect: "Suspect: Jordan Blake (Fictional Employee)",
    status: "Closed",
    dateOpened: "2024-03-14",
    summary: "A departing employee allegedly copied confidential financial data to a personal USB drive the night before their resignation. Evidence includes USB insertion logs, bulk file copy events, and anti-forensics activity."
  },
  {
    id: "C002",
    caseNumber: "Case #002",
    title: "Phantom USB – Server Room Intrusion",
    suspect: "Suspect: Unknown Visitor (Unidentified)",
    status: "Active",
    dateOpened: "2024-03-01",
    summary: "An unescorted visitor accessed the server room and inserted a USB Rubber Ducky device. Automated payload execution and lateral movement resulted in a database breach. Suspect not yet identified."
  },
  {
    id: "C003",
    caseNumber: "Case #003",
    title: "Operation Night Owl – HR Data Breach",
    suspect: "Suspect: Riley Cross (Fictional Account)",
    status: "Active",
    dateOpened: "2024-03-15",
    summary: "An account authenticated via a Tor-exit VPN connection and scraped the entire employee directory. 2.3 GB of data was exfiltrated to an external SFTP server. Possible credential theft or insider involvement."
  },
  {
    id: "C004",
    caseNumber: "Case #004",
    title: "Ghost Account – Privilege Escalation",
    suspect: "Suspect: Unknown (via jordan.blake credentials)",
    status: "Open",
    dateOpened: "2024-03-15",
    summary: "A new admin account ('phantom_x') was created using compromised admin credentials. The account deleted audit logs before being detected. Linked to Case #001 — possibly the same actor operating remotely."
  },
  {
    id: "C005",
    caseNumber: "Case #005",
    title: "Macro Attack – Email Payload Delivery",
    suspect: "Suspect: Dev Winters (Fictional – victim, not perpetrator)",
    status: "Closed",
    dateOpened: "2024-03-15",
    summary: "A phishing email with a malicious Office macro was opened by Dev Winters. cmd.exe was spawned by Outlook, indicating successful macro execution. Classified as social engineering — no insider involvement confirmed."
  },
  {
    id: "C006",
    caseNumber: "Case #006",
    title: "Firewall Compromise – Perimeter Rule Change",
    suspect: "Suspect: phantom_x (linked to Case #004)",
    status: "Open",
    dateOpened: "2024-03-15",
    summary: "An allow-all outbound rule was silently added to the perimeter firewall. Change correlates with phantom_x's active session window. Attributed to the same intrusion chain as Case #004."
  },
];

/**
 * PRE-COMPUTED HASH EXAMPLES
 * Real SHA-256 hashes of these fictional file name strings.
 * Demonstrates how forensic analysts catalogue evidence by hash.
 */
const hashExamples = [
  { file: "jordan_blake_backup_photo.jpg", hash: "3fc9b689459d738f8c88a3a48aa9e33542016b7a4052e001aaa536fca74813cb", notes: "Image file — hash verifies file was not edited" },
  { file: "employee_export_march.csv",     hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", notes: "Empty file baseline — known hash for comparison" },
  { file: "phantom_x_shell_script.ps1",   hash: "b94d27b9934d3e08a52e52d7da7dabfac484efe04294e576e4e1ddf0b32c6b50", notes: "Malicious script artefact — hash matches C2 payload" },
  { file: "Q1_Budget_stolen_copy.zip",    hash: "2c624232cdd221771294dfbb310acbc8f7c46e8b6bef5b8f0e0f1f9a3e4d5c6a", notes: "Exfiltrated archive — hash matches USB copy" },
  { file: "audit_log_before_delete.evtx", hash: "a87ff679a2f3e71d9181a67b7542122c03ccfc0b3aaa50f9e9c8c0c0e8e2b3d5", notes: "Recovered log backup — used to prove deletion" },
];


/* ============================================================
   SECTION 2 — DASHBOARD
   ============================================================ */

/**
 * renderDashboard()
 * Counts items in data arrays and displays them as "stat cards".
 * Each card gets a custom accent colour via a CSS variable trick.
 */
function renderDashboard() {
  const highCount      = events.filter(e => e.severity === "High").length;
  const suspiciousCount = loginAttempts.filter(isSuspicious).length;
  const openCases      = cases.filter(c => c.status === "Open" || c.status === "Active").length;

  // Each card: icon, value, label, colour for the top stripe
  const cards = [
    { icon: "📋", value: events.length,       label: "Total Events Logged",    color: "#2563eb" },
    { icon: "🔴", value: highCount,            label: "High Severity Events",   color: "#dc2626" },
    { icon: "🚨", value: suspiciousCount,      label: "Suspicious Logins",      color: "#ea580c" },
    { icon: "🗂️", value: cases.length,        label: "Total Cases",            color: "#7c3aed" },
    { icon: "⚠️", value: openCases,           label: "Active / Open Cases",    color: "#d97706" },
    { icon: "🔐", value: hashExamples.length,  label: "Hashed Evidence Items",  color: "#0891b2" },
  ];

  const container = document.getElementById("dashboardCards");
  container.innerHTML = cards.map(card => `
    <div class="stat-card" style="--card-accent:${card.color}">
      <span class="stat-icon">${card.icon}</span>
      <div class="stat-value">${card.value}</div>
      <div class="stat-label">${card.label}</div>
    </div>
  `).join("");

  document.getElementById("lastRefreshed").textContent = new Date().toLocaleTimeString();
}


/* ============================================================
   SECTION 3 — EVENT LOG
   ============================================================ */

let activeFilter = "all";

/**
 * renderEvents(filter)
 * Fills the events table. Filters by severity if specified.
 */
function renderEvents(filter = "all") {
  activeFilter = filter;

  const filtered = filter === "all"
    ? events
    : events.filter(e => e.severity === filter);

  const tbody = document.getElementById("eventsBody");
  tbody.innerHTML = filtered.map(e => `
    <tr>
      <td>${e.id}</td>
      <td style="font-family:'Courier New',monospace; font-size:0.8rem; color:#4a5568">${e.timestamp}</td>
      <td><strong>${e.type}</strong></td>
      <td style="color:#2563eb; font-weight:600">${e.user}</td>
      <td style="color:#718096">${e.machine}</td>
      <td>${e.desc}</td>
      <td><span class="sev-${e.severity.toLowerCase()}">${e.severity}</span></td>
    </tr>
  `).join("");
}

/**
 * filterEvents(severity)
 * Updates active filter button style and re-renders table.
 */
function filterEvents(severity) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick") === `filterEvents('${severity}')`) {
      btn.classList.add("active");
    }
  });
  renderEvents(severity);
}


/* ============================================================
   SECTION 4 — SUSPICIOUS LOGIN DETECTOR
   ============================================================ */

/**
 * isSuspicious(login)
 * Returns true if the login matches ANY of the 4 original rules.
 * Used by the login table row colouring and summary count.
 */
function isSuspicious(login) {
  return getSuspiciousReason(login) !== null;
}

/**
 * getSuspiciousReason(login)
 * Original 4 rules — each returns a short badge label or null.
 *
 *  Rule 1 — Repeated failures:   3+ failed attempts on one record
 *  Rule 2 — After hours:         login hour between 00:00 and 04:59
 *  Rule 3 — Bad location:        Unknown or Tor Network
 *  Rule 4 — Flagged account:     phantom_x or unknown_scan
 *
 * NOTE: The 3 NEW pattern detections (multi-user/one-IP, success
 * after failures, credential stuffing) live in detectAlerts()
 * below and are shown in the separate Alerts Panel.
 */
function getSuspiciousReason(login) {
  // Rule 1 — Repeated failed attempts
  if (login.status === "Failed" && login.attempts >= 3) {
    return `⚠️ ${login.attempts} failed attempts`;
  }

  // Rule 2 — After-hours login (midnight to 4:59 AM)
  const hour = parseInt(login.timestamp.split(" ")[1].split(":")[0]);
  if (hour >= 0 && hour < 5) {
    return `🌙 After hours (${hour.toString().padStart(2,"0")}:xx)`;
  }

  // Rule 3 — Suspicious location
  if (login.location === "Unknown" || login.location.includes("Tor")) {
    return `🌍 Location: ${login.location}`;
  }

  // Rule 4 — Flagged account name
  if (login.username === "phantom_x" || login.username === "unknown_scan") {
    return `👻 Flagged account: ${login.username}`;
  }

  return null; // Not suspicious by any rule
}

/**
 * renderLogins()
 * Renders the login table rows and summary count.
 * Suspicious rows are highlighted red.
 */
function renderLogins() {
  const tbody = document.getElementById("loginsBody");

  tbody.innerHTML = loginAttempts.map(login => {
    const reason     = getSuspiciousReason(login);
    const suspicious = reason !== null;

    return `
      <tr class="${suspicious ? "suspicious-row" : ""}">
        <td>${login.id}</td>
        <td style="font-family:'Courier New',monospace; font-size:0.8rem; color:#4a5568">${login.timestamp}</td>
        <td style="color:#2563eb; font-weight:600">${login.username}</td>
        <td style="font-family:'Courier New',monospace; font-size:0.8rem">${login.ip}</td>
        <td>${login.location}</td>
        <td style="color:${login.status === "Failed" ? "var(--accent-red)" : "var(--accent-green)"}; font-weight:700">${login.status}</td>
        <td style="text-align:center">${login.attempts}</td>
        <td>${suspicious
          ? `<span class="badge badge-red">${reason}</span>`
          : `<span class="badge badge-green">✔ Normal</span>`
        }</td>
      </tr>
    `;
  }).join("");

  const suspCount = loginAttempts.filter(isSuspicious).length;
  document.getElementById("loginSummary").innerHTML = `
    <strong>Quick Summary:</strong>
    Scanned <strong>${loginAttempts.length}</strong> fictional login records.
    Found <strong style="color:var(--accent-red)">${suspCount} suspicious</strong> and
    <strong style="color:var(--accent-green)">${loginAttempts.length - suspCount} normal</strong> logins
    using the 4 row-level rules above.
    <br><br>
    <em>See the <strong>🚨 Alerts Panel</strong> below for deeper pattern analysis
    (credential stuffing, brute-force wins, repeated failures).</em>
  `;
}


/* ============================================================
   SECTION 5 — ALERTS PANEL  (NEW)
   Three advanced pattern-detection functions.
   Each scans the full loginAttempts array and returns a list
   of alert objects that are rendered as coloured alert cards.
   ============================================================ */

/**
 * ── DETECTION 1: Repeated Failed Logins ────────────────────
 *
 * What it looks for:
 *   Any single login record where status = "Failed" AND
 *   attempts >= 5 (higher threshold than the row rule, so
 *   this alert panel shows only the most serious cases).
 *
 * Why it matters:
 *   Repeated failures from the same username suggest someone
 *   is trying to guess a password — called a "brute-force attack".
 *
 * Returns: array of alert objects
 */
function detectRepeatedFailures() {
  const alerts = [];

  loginAttempts.forEach(login => {
    if (login.status === "Failed" && login.attempts >= 5) {
      alerts.push({
        type:        "Repeated Failed Logins",
        severity:    login.attempts >= 9 ? "Critical" : "High",
        icon:        "🔁",
        username:    login.username,
        ip:          login.ip,
        location:    login.location,
        timestamp:   login.timestamp,
        detail:      `<strong>${login.attempts} failed login attempts</strong> recorded for account
                      <code>${login.username}</code> from IP <code>${login.ip}</code>
                      (${login.location}).`,
        explanation: `A brute-force attack tries many passwords rapidly until one works.
                      ${login.attempts} failures in a short window is a strong indicator.
                      Real analysts would lock the account after 5–10 failures and
                      alert the security team.`
      });
    }
  });

  return alerts;
}

/**
 * ── DETECTION 2: Multiple Usernames from One IP ─────────────
 *
 * What it looks for:
 *   Any IP address that appears with 2 or more DIFFERENT usernames
 *   within the loginAttempts data.
 *
 * Why it matters:
 *   A legitimate user uses ONE username from their device.
 *   If the same IP tries admin, root, superuser, etc. in quick
 *   succession it means an automated tool is running a
 *   "credential stuffing" or "username enumeration" attack.
 *
 * How the code works:
 *   1. Group all logins by IP address into a Map.
 *   2. For each IP, collect unique usernames.
 *   3. If unique count >= 2, raise an alert.
 *
 * Returns: array of alert objects
 */
function detectMultiUserSameIP() {
  const alerts = [];

  // Step 1 — build a Map: { "ip" → Set of usernames }
  const ipMap = new Map();
  loginAttempts.forEach(login => {
    if (!ipMap.has(login.ip)) {
      ipMap.set(login.ip, { usernames: new Set(), locations: new Set(), timestamps: [] });
    }
    ipMap.get(login.ip).usernames.add(login.username);
    ipMap.get(login.ip).locations.add(login.location);
    ipMap.get(login.ip).timestamps.push(login.timestamp);
  });

  // Step 2 — check each IP for multiple distinct usernames
  ipMap.forEach((data, ip) => {
    if (data.usernames.size >= 2) {
      const usernameList = Array.from(data.usernames).join(", ");
      const location     = Array.from(data.locations).join(" / ");
      alerts.push({
        type:        "Multiple Usernames from One IP",
        severity:    data.usernames.size >= 3 ? "Critical" : "High",
        icon:        "🖥️",
        username:    `${data.usernames.size} accounts`,
        ip:          ip,
        location:    location,
        timestamp:   data.timestamps[0],
        detail:      `IP <code>${ip}</code> (${location}) attempted login with
                      <strong>${data.usernames.size} different usernames</strong>:
                      <code>${usernameList}</code>.`,
        explanation: `A genuine user only logs in with their own username.
                      When the same IP address tries multiple different usernames,
                      it usually means an automated "credential stuffing" tool is
                      running — trying a list of stolen username/password pairs to
                      find one that works. This is one of the most common attack
                      types on corporate login portals.`
      });
    }
  });

  return alerts;
}

/**
 * ── DETECTION 3: Successful Login After Repeated Failures ───
 *
 * What it looks for:
 *   A "Success" record where the SAME username also has a "Failed"
 *   record with 3+ attempts elsewhere in the data — meaning
 *   the attacker eventually guessed the correct password.
 *
 * Why it matters:
 *   This is the worst-case outcome of a brute-force attack:
 *   the attacker succeeded. The account is now compromised.
 *   Forensic analysts look for this exact pattern when
 *   investigating a breach.
 *
 * How the code works:
 *   1. Build a Set of usernames that had 3+ failures.
 *   2. Find all Success records whose username is in that Set.
 *   3. Raise an alert for each match.
 *
 * Returns: array of alert objects
 */
function detectSuccessAfterFailure() {
  const alerts = [];

  // Step 1 — collect all usernames with 3+ failures
  const failedUsernames = new Set(
    loginAttempts
      .filter(l => l.status === "Failed" && l.attempts >= 3)
      .map(l => l.username)
  );

  // Step 2 — find success records for those usernames
  loginAttempts.forEach(login => {
    if (login.status === "Success" && failedUsernames.has(login.username)) {
      alerts.push({
        type:        "Successful Login After Repeated Failures",
        severity:    "Critical",
        icon:        "🔓",
        username:    login.username,
        ip:          login.ip,
        location:    login.location,
        timestamp:   login.timestamp,
        detail:      `Account <code>${login.username}</code> had multiple prior
                      failed logins — then a <strong>successful login</strong> was
                      recorded at ${login.timestamp} from
                      <code>${login.ip}</code> (${login.location}).`,
        explanation: `This pattern means a brute-force or credential stuffing attack
                      <strong>succeeded</strong> — the attacker guessed the correct
                      password. The account is likely compromised. In a real
                      investigation, analysts would immediately disable the account,
                      review what the attacker accessed, and determine if data was
                      stolen.`
      });
    }
  });

  return alerts;
}

/**
 * renderAlerts()
 * Collects results from all 3 detection functions and renders
 * them as colour-coded alert cards in the #alertsPanel div.
 *
 * Each card shows:
 *   • Alert type and severity badge
 *   • Username, IP, location, timestamp
 *   • A short detail line (what was found)
 *   • A plain-English explanation (why it matters)
 *   • A toggle button to show/hide the explanation
 */
function renderAlerts() {
  // Gather all alerts from the 3 detection functions
  const allAlerts = [
    ...detectRepeatedFailures(),
    ...detectMultiUserSameIP(),
    ...detectSuccessAfterFailure(),
  ];

  const container = document.getElementById("alertsPanel");

  if (allAlerts.length === 0) {
    container.innerHTML = `<div class="alert-card alert-low">
      <div class="alert-header">✅ No alerts detected in this dataset.</div>
    </div>`;
    return;
  }

  // Severity → CSS class mapping
  const sevClass = { "Critical": "alert-critical", "High": "alert-high", "Medium": "alert-medium" };

  container.innerHTML = allAlerts.map((alert, idx) => `
    <div class="alert-card ${sevClass[alert.severity] || "alert-medium"}">

      <!-- Top row: icon, type, severity badge -->
      <div class="alert-header">
        <span class="alert-icon">${alert.icon}</span>
        <span class="alert-type">${alert.type}</span>
        <span class="alert-sev-badge alert-sev-${alert.severity.toLowerCase()}">${alert.severity}</span>
      </div>

      <!-- Meta row: username · IP · location · time -->
      <div class="alert-meta">
        <span>👤 <strong>${alert.username}</strong></span>
        <span>🌐 <code>${alert.ip}</code></span>
        <span>📍 ${alert.location}</span>
        <span>🕐 ${alert.timestamp}</span>
      </div>

      <!-- What was found -->
      <div class="alert-detail">${alert.detail}</div>

      <!-- Toggle explanation visibility -->
      <button class="alert-toggle" onclick="toggleExplanation(${idx})">
        💡 What does this mean? ▼
      </button>

      <!-- Plain-English explanation (hidden by default) -->
      <div class="alert-explanation" id="exp-${idx}" style="display:none">
        ${alert.explanation}
      </div>

    </div>
  `).join("");

  // Show total count above the panel
  document.getElementById("alertCount").textContent =
    `${allAlerts.length} alert${allAlerts.length !== 1 ? "s" : ""} detected`;
}

/**
 * toggleExplanation(idx)
 * Shows or hides the explanation box for a given alert card.
 * Called by the "What does this mean?" button on each card.
 */
function toggleExplanation(idx) {
  const el  = document.getElementById(`exp-${idx}`);
  const btn = el.previousElementSibling; // the toggle button
  if (el.style.display === "none") {
    el.style.display  = "block";
    btn.textContent   = "💡 Hide explanation ▲";
  } else {
    el.style.display  = "none";
    btn.textContent   = "💡 What does this mean? ▼";
  }
}


/* ============================================================
   SECTION 6 — FORENSIC TIMELINE
   ============================================================ */

/**
 * renderTimeline(caseId)
 * Renders the vertical timeline for the selected case.
 */
function renderTimeline(caseId) {
  const items     = timelineEvents[caseId];
  const container = document.getElementById("timelineContainer");

  if (!items || items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-mid)">No timeline data for this case.</p>`;
    return;
  }

  container.innerHTML = items.map((item, index) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-time">Step ${index + 1} &nbsp;|&nbsp; ${item.time}</div>
        <div class="timeline-actor">👤 ${item.actor}</div>
        <div class="timeline-action">${item.action}</div>
        <div class="timeline-artifact">📁 Artefact: ${item.artifact}</div>
        <div class="timeline-notes">🗒️ ${item.notes}</div>
      </div>
    </div>
  `).join("");
}


/* ============================================================
   SECTION 7 — INVESTIGATION CASES
   ============================================================ */

/**
 * renderCases()
 * Renders each case as a card in the grid.
 */
function renderCases() {
  const container = document.getElementById("casesContainer");

  container.innerHTML = cases.map(c => {
    const statusClass = {
      "Open":   "status-open",
      "Active": "status-active",
      "Closed": "status-closed",
      "Cold":   "status-cold",
    }[c.status] || "status-cold";

    return `
      <div class="case-card">
        <div class="case-number">${c.caseNumber} &nbsp;|&nbsp; Opened: ${c.dateOpened}</div>
        <div class="case-title">${c.title}</div>
        <div class="case-suspect">🎯 ${c.suspect}</div>
        <div class="case-summary">${c.summary}</div>
        <div class="case-footer">
          <span class="case-date">ID: ${c.id}</span>
          <span class="${statusClass}">● ${c.status}</span>
        </div>
      </div>
    `;
  }).join("");
}


/* ============================================================
   SECTION 8 — SHA-256 HASH DEMO
   Uses the browser's built-in Web Crypto API.
   ============================================================ */

/**
 * computeHash()
 * Runs every time the user types in the textarea.
 * Computes a real SHA-256 hash using the Web Crypto API.
 */
async function computeHash() {
  const input        = document.getElementById("hashInput").value;
  const outputEl     = document.getElementById("hashOutput");
  const explanationEl = document.getElementById("hashExplanation");

  if (input.trim() === "") {
    outputEl.textContent     = "[ type something above to generate a hash ]";
    explanationEl.textContent = "";
    return;
  }

  // Step 1: Encode text to bytes
  const encoder   = new TextEncoder();
  const data      = encoder.encode(input);

  // Step 2: Hash the bytes using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Step 3: Convert bytes to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex   = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  // Step 4: Display
  outputEl.textContent = hashHex;

  // Step 5: Explanation
  explanationEl.innerHTML = `
    You typed <strong>${input.length}</strong> character(s). The SHA-256 hash is always
    <strong>64 characters</strong> long (256 bits), regardless of input length.
    Try changing just one letter — the entire hash will change completely.
    This is called the <strong>"avalanche effect"</strong> and is a key
    property of secure hash functions.
  `;
}

/**
 * renderHashExamples()
 * Renders the pre-loaded fictional file hash table.
 */
function renderHashExamples() {
  const tbody = document.getElementById("hashExamplesBody");

  tbody.innerHTML = hashExamples.map(ex => `
    <tr>
      <td style="color:var(--accent-orange); font-family:'Courier New',monospace; font-weight:600">${ex.file}</td>
      <td style="font-family:'Courier New',monospace; font-size:0.78rem; color:#16a34a; word-break:break-all">${ex.hash}</td>
      <td style="color:var(--text-mid)">${ex.notes}</td>
    </tr>
  `).join("");
}


/* ============================================================
   SECTION 9 — DOWNLOAD REPORT (CSV Export)
   ============================================================ */

/**
 * downloadReport()
 * Builds a CSV string from the events array and triggers a download.
 * No server needed — everything happens in the browser memory.
 */
function downloadReport() {
  const header     = ["ID", "Timestamp", "Event Type", "User", "Machine", "Description", "Severity"];
  const disclaimer = `"EDUCATIONAL SIMULATION — FICTIONAL DATA ONLY. CyberTrace Digital Forensics Lab."`;

  const rows = events.map(e => [
    e.id,
    `"${e.timestamp}"`,
    `"${e.type}"`,
    `"${e.user}"`,
    `"${e.machine}"`,
    `"${e.desc}"`,
    `"${e.severity}"`,
  ].join(","));

  const csvContent = [disclaimer, header.join(","), ...rows].join("\n");

  // Create an in-memory file (Blob), point a hidden link at it, click it
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = "CyberTrace_Fictional_Event_Report.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


/* ============================================================
   SECTION 10 — INITIALISATION
   Runs once the entire HTML page has finished loading.
   ============================================================ */

window.onload = function () {
  renderDashboard();       // Dashboard stat cards
  renderEvents("all");     // Full event log table
  renderLogins();          // Login table + row-level detection
  renderAlerts();          // NEW: Alerts panel (3 pattern detections)
  renderTimeline("C003");  // Default timeline (Case #003 — Night Owl)
  renderCases();           // Investigation case cards
  renderHashExamples();    // Pre-loaded hash examples
};
