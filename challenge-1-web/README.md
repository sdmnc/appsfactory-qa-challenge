# Challenge 1: Amazon Web Automation

Automated end-to-end tests for Amazon.com using **WebdriverIO (v8)**, **Cucumber**, and **JavaScript**.

---

## 📝 Challenge Overview

This project automates the following flow:

1. Navigate to the Amazon home page
2. Search for "Snickers" and "Skittles"
3. Identify and add the cheapest versions of each product to the basket
4. Verify the basket count and correct total price calculation
5. Ensure that proceeding to checkout as an unauthorized user redirects to the Sign-In/Registration page

---

## 🛠️ Tech Stack

- **Framework:** WebdriverIO
- **BDD Tool:** Cucumber
- **Language:** JavaScript (ES6+)
- **Environment:** Node.js 24+

---

## 🌍 Network & Regional Notice

> **Important:** Due to regional restrictions and inconsistent behavior of Amazon.com in certain regions (e.g., Moldova), these tests were developed and verified using a **VPN with a US-based IP address**.
>
> If you encounter connectivity issues or "Access Denied" errors during execution, please ensure your network environment allows traffic to Amazon.com or use a US proxy.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v24 or higher)
- Chrome Browser

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sdmnc/appsfactory-qa-challenge.git
cd challenge-1-web
npm install
```

### Running the Tests

To execute all tests in headless Chrome:

```bash
npm test
# or
npx wdio run wdio.conf.js
```

---

## 📁 Project Structure

- `features/` — Gherkin feature files (test scenarios)
- `step-definitions/` — Step definitions for Cucumber
- `page-objects/` — Page Object Model classes for Amazon pages
- `wdio.conf.js` — WebdriverIO configuration
- `package.json` — Project dependencies and scripts

---

## 🧩 Troubleshooting & Tips

- **VPN/Proxy:** Use a US-based VPN if you see "Access Denied" or region errors.
- **Selectors:** Amazon UI may change; update selectors in `page-objects/` if tests fail due to missing elements.
- **Browser:** Ensure Chrome is installed and up to date.
- **Node Version:** Use Node.js 24+ for best compatibility.
