==============================================================
  CyberTrace – Simulated Digital Forensics Lab
  README.txt  |  Last Updated: 2024
==============================================================

  ⚠️  EDUCATIONAL SIMULATION — FICTIONAL DATA ONLY
      No real systems. No real data. No real people.
      All locations are fictional Indian cities.

==============================================================
  !! IMPORTANT — MISSING FILES NOTICE !!
==============================================================

  The following core application files are required but may
  be missing from your folder. You must have ALL THREE for
  the app to work:

      index.html   ← The main webpage
      style.css    ← The styling (already present ✔)
      app.js       ← The logic and data

  If index.html or app.js are missing, please restore them
  from your backup or ask your instructor for the full project
  folder. The app will NOT open without all 3 files.

==============================================================
  WHAT IS CYBERTRACE?
==============================================================

  CyberTrace is a beginner-friendly, interactive web
  application that teaches the fundamentals of digital
  forensics and cybersecurity investigation using 100%
  fictional, made-up data.

  You do NOT need any cybersecurity background to use it.
  Everything is labelled and explained in plain English.
  All login location data uses fictional Indian cities.

==============================================================
  HOW TO RUN  (Zero installs needed)
==============================================================

  Step 1 — Make sure these 3 files are in the SAME folder:

              CyberTrace/
                  index.html
                  style.css
                  app.js

  Step 2 — Double-click   index.html

  Step 3 — It opens in your web browser. Done!

  Compatible browsers:
    ✔ Google Chrome      (recommended)
    ✔ Microsoft Edge     (already on Windows 10/11)
    ✔ Mozilla Firefox
    ✔ Apple Safari

  No Python. No Node.js. No server. No internet required.

==============================================================
  COMPLETE FEATURE LIST
==============================================================

  ┌─────────────────────────────────────────────────────────┐
  │ 1. DASHBOARD                                            │
  │    Six live summary cards:                              │
  │    • Total Events Logged        • High Severity Events  │
  │    • Suspicious Logins          • Total Cases           │
  │    • Active / Open Cases        • Hashed Evidence Items │
  │    Includes a green pulsing "Simulation Active" dot.    │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 2. EVENT LOG                                            │
  │    22 fictional system events from a fictional          │
  │    corporate network.                                   │
  │    Filter buttons: All / High / Medium / Low            │
  │    One-click CSV export with disclaimer header row.     │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 3. SUSPICIOUS LOGIN DETECTOR  (Two Parts)               │
  │                                                         │
  │  PART 1 — Login Records Table                          │
  │    20 fictional login records. Each row is checked      │
  │    against 4 detection rules. Suspicious rows turn red. │
  │    All locations use fictional Indian cities.           │
  │                                                         │
  │    Row Detection Rules:                                 │
  │      Rule 1: 3+ failed login attempts                   │
  │      Rule 2: Login between midnight and 4:59 AM         │
  │      Rule 3: Unknown or Tor Network location            │
  │      Rule 4: Flagged account (phantom_x / unknown_scan) │
  │                                                         │
  │  PART 2 — Alerts Panel (3 Advanced Detections)         │
  │    Scans the full dataset for patterns across records.  │
  │                                                         │
  │    Detection 1 — Repeated Failed Logins:                │
  │      Flags accounts with 5+ failed attempts.            │
  │      Indicates a brute-force password attack.           │
  │                                                         │
  │    Detection 2 — Multiple Usernames from One IP:        │
  │      Flags any IP address that tried 2+ different       │
  │      usernames. Indicates credential stuffing.          │
  │      Example: admin / root / superuser all from         │
  │      IP 203.0.113.99 (Mumbai, India)                    │
  │                                                         │
  │    Detection 3 — Success After Repeated Failures:       │
  │      Flags a successful login that follows prior        │
  │      failures from the same account. Indicates the      │
  │      attacker guessed the correct password.             │
  │      Example: meera.iyer — 7 failures then success      │
  │      from Kolkata, India                                │
  │                                                         │
  │    Each alert card has a "💡 What does this mean?"      │
  │    button that shows a plain-English explanation.       │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 4. FORENSIC TIMELINE                                    │
  │    Visual step-by-step timeline for 3 fictional cases.  │
  │    Switch between cases using the dropdown menu.        │
  │                                                         │
  │    Case #001 — Insider Threat       (8 steps, Closed)  │
  │    Case #002 — Phantom USB          (7 steps, Active)  │
  │    Case #003 — Operation Night Owl  (7 steps, Active)  │
  │                                                         │
  │    Each step shows: actor, action, evidence artefact,   │
  │    and analyst notes.                                   │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 5. INVESTIGATION CASES                                  │
  │    6 fictional case file cards:                         │
  │                                                         │
  │    C001 — Insider Threat – Q1 Data Exfiltration (Closed)│
  │    C002 — Phantom USB – Server Room Intrusion  (Active) │
  │    C003 — Operation Night Owl – HR Data Breach (Active) │
  │    C004 — Ghost Account – Privilege Escalation (Open)   │
  │    C005 — Macro Attack – Email Payload Delivery (Closed)│
  │    C006 — Firewall Compromise – Perimeter Rule  (Open)  │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 6. SHA-256 HASH DEMO                                    │
  │    Type any text → see a real SHA-256 hash instantly.   │
  │    Uses the browser's built-in Web Crypto API.          │
  │    No external library required.                        │
  │    Teaches: hashing, avalanche effect, evidence         │
  │    integrity verification.                              │
  │    Pre-loaded table: 5 fictional evidence file hashes.  │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ 7. DOWNLOAD REPORT                                      │
  │    One-click download of all 22 fictional events as a   │
  │    .csv file. Generated entirely in the browser.        │
  │    Includes a disclaimer row at the top of the file.    │
  └─────────────────────────────────────────────────────────┘

==============================================================
  FICTIONAL DATA — INDIA LOCATIONS
==============================================================

  All login record locations use fictional Indian cities:

    Mumbai, India        Bengaluru, India
    Chennai, India       Hyderabad, India
    Delhi, India         Pune, India
    Kolkata, India       Ahmedabad, India

  These are fictional labels only. No real geolocation or
  IP-to-location lookup is performed.

==============================================================
  FICTIONAL USERNAMES
==============================================================

  All usernames are invented for educational illustration:

  alex.morgan    — Marketing analyst (normal user)
  sam.taylor     — IT support engineer
  jordan.blake   — Finance (insider threat suspect, C001)
  casey.nova     — HR administrator (normal user)
  riley.cross    — External attacker account (C003)
  phantom_x      — Rogue account created by attacker (C004)
  dev.winters    — Developer (phishing victim, C005)
  pat.sterling   — Remote contractor (suspicious logins)
  meera.iyer     — Brute-force victim (Kolkata, India)
  raj.verma      — High-failure account (Delhi, India)
  admin          — Default account targeted in stuffing attack
  root           — Default account targeted in stuffing attack
  superuser      — Default account targeted in stuffing attack

==============================================================
  FILE STRUCTURE
==============================================================

  CyberTrace/
  |
  +-- index.html            The main webpage (all 7 sections)
  +-- style.css             All styling (light professional theme)
  +-- app.js                All logic, data, detection, SHA-256
  |
  +-- README.txt            This file
  +-- requirements.txt      What you need to run the app
  +-- CODE_EXPLANATION.md   Beginner code walkthrough
  +-- PROJECT_SUMMARY.md    One-page project overview
  +-- Cybertrace-Project report.html  Full submission report

==============================================================
  TECHNOLOGIES USED
==============================================================

  HTML5            — Page structure and all sections
  CSS3             — Light theme, cards, tables, alerts
  JavaScript ES6+  — Data, rendering, detection, SHA-256
  Web Crypto API   — Real SHA-256 (built into the browser)
  Blob API         — In-browser CSV file generation

  No frameworks. No libraries. No dependencies.
  Zero installs required.

==============================================================
  EDUCATIONAL CONCEPTS COVERED
==============================================================

  Digital Forensics:
    - System event logging and severity classification
    - Forensic timeline reconstruction
    - Chain of custody and evidence artefacts
    - Digital case management
    - Anti-forensics (log wiping with cipher /w)
    - Evidence integrity via cryptographic hashing

  Cybersecurity Threats:
    - Brute-force password attacks
    - Credential stuffing attacks
    - After-hours access anomalies
    - Tor network / anonymisation techniques
    - Insider threat patterns
    - HID/USB-based physical attacks (Rubber Ducky)
    - Lateral movement and privilege escalation
    - Data exfiltration indicators
    - Social engineering / phishing / macro attacks
    - Firewall rule tampering

  Cryptography:
    - SHA-256 hashing
    - Avalanche effect
    - File integrity verification

==============================================================
  DISCLAIMER
==============================================================

  This application is for EDUCATIONAL PURPOSES ONLY.

  - All usernames, names, and accounts are invented
  - All IP addresses are fictional (RFC 5737 documentation
    ranges: 192.0.2.x, 198.51.100.x, 203.0.113.x)
  - All events, cases, and timelines are invented scenarios
  - All Indian city locations are fictional labels only
  - No real systems are connected
  - No real files are uploaded or processed
  - The SHA-256 demo only hashes text you type yourself

  Do NOT use this tool for any real investigation.

==============================================================
  CyberTrace — Simulated Digital Forensics Lab
  Educational Simulation | Runs 100% in your browser
  Built with HTML · CSS · JavaScript
==============================================================
