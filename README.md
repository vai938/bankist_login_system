# 🏦 Bankist – Modern Banking Dashboard & Login System

An interactive digital banking web application built with vanilla JavaScript. It simulates real-world banking operations, including client-side credential authentication, real-time fund transfers, loan requests, account closures, dynamic transaction filtering, and inactivity session timers.

🌐 **Live Interactive Demo:** [vai938.github.io/bankist_login_system](https://vai938.github.io/bankist_login_system/)

---

## 📸 Preview

![Bankist Dashboard Preview](preview.png)
*(Ensure your screenshot filename in the root directory matches `preview.png`, or update the filename above.)*

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Demo Credentials](#-demo-credentials)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Application Architecture & Logic](#-application-architecture--logic)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## 📖 Overview

**Bankist** is designed to showcase core front-end JavaScript concepts—such as complex DOM manipulation, state management, array transformations, date/currency formatting, and asynchronous timers—within a clean, responsive banking user interface.

---

## 🔑 Demo Credentials

To test the application, log in with the following default credentials:

| User | Username | PIN |
| :--- | :---: | :---: |
| **Vaibhav Thapliyal** | `vt` | `1111` |

*(Additional accounts can be configured directly within the user account array in `script.js`.)*

---

## ✨ Key Features

- **Client-Side Authentication:** Secure verification of usernames and PINs with personalized welcome messaging.
- **Dynamic Account Balance & Summary:** Real-time calculation of total deposits, withdrawals, and accrued interest using functional array methods.
- **Fund Transfers:** Instant balance validation and inter-account money transfers.
- **Loan Request Workflow:** Automated loan approval logic requiring at least one previous deposit $\ge 10\%$ of the requested loan amount.
- **Account Deletion:** Allows users to close and permanently remove accounts from memory upon confirming correct credentials.
- **Transaction Sorting:** Interactive toggle to sort deposits and withdrawals chronologically or by transaction size.
- **Session Inactivity Timer:** Automatic 5-minute countdown that logs out the active user on expiration to protect session integrity.
- **Internationalization (i18n):** Formats currency and dates according to locale standards.

---

## 🛠 Tech Stack

- **Markup:** HTML5 (Semantic Structure)
- **Styling:** CSS3 (Custom properties, Flexbox, Grid, transitions)
- **Logic & State Management:** Vanilla JavaScript (ES6+)
- **APIs & Web Features:** Internationalization API (`Intl`), DOM API, JavaScript Timers (`setInterval` / `clearInterval`)
- **Deployment:** GitHub Pages

---

## ⚙️ Application Architecture & Logic

- **Functional Programming:** Heavy utilization of higher-order array methods (`map`, `filter`, `reduce`, `find`, `findIndex`, `some`, `every`) to handle application state immutably.
- **Timer Management:** Global interval handling ensures timers reset on user interaction and clear cleanly upon logout or user switching.
- **Dynamic DOM Rendering:** Transaction rows are constructed and inserted into the DOM on the fly based on account movement data.

---

## 📂 Project Structure

```plaintext
bankist_login_system/
│
├── index.html        # Core banking dashboard and login layout
├── style.css         # UI styling, responsive rules, and animations
├── script.js         # State management, calculations, and event handlers
├── preview.png       # Root dashboard preview image
│
└── README.md         # Repository documentation
