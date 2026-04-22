# Syed Faizaan Ahmad Portfolio

A modern personal portfolio website built to showcase projects, skills, experience, and contact information in a clean interactive format.

Live site: [Portfolio Website](https://syed-faizaan-ahmad-24df4388l-syedfaizaan2004s-projects.vercel.app/)

## Overview

This project is a static portfolio website for Syed Faizaan Ahmad. It highlights:

- personal introduction and resume download
- animated hero section with typing effect
- about section with tabbed content
- skills and services sections
- filterable project showcase
- GitHub activity cards
- contact form integration
- hidden admin dashboard for managing portfolio data

The site is built with plain HTML, CSS, and JavaScript, with portfolio content stored in `localStorage` through a lightweight data layer.

## Features

- Responsive single-page portfolio layout
- Smooth scroll and section-based navigation
- Animated loader, counters, reveal effects, and custom cursor
- Dynamic skills and projects rendered from JavaScript data
- Project filters by technology
- Resume link support
- Contact form connected to Google Apps Script
- Hidden dashboard to manage:
  - projects
  - skills
  - about text
  - counters
  - resume link

## Tech Stack

- `HTML5`
- `CSS3`
- `JavaScript`
- `Font Awesome`
- `Google Fonts`
- `localStorage`
- `Google Apps Script`

## Project Structure

```text
Portfolio/
├── index.html
├── app.js
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── data.js
│       ├── ui.js
│       └── dashboard.js
├── images/
│   ├── logo.png
│   ├── User.jpg
│   ├── work_1.png
│   ├── work_2.jpeg.png
│   ├── work_3.jpeg
│   └── Syed faizaan CV.pdf
└── README.md
```

## How It Works

`assets/js/data.js`
Stores the default portfolio data and manages reading/writing data from `localStorage`.

`assets/js/ui.js`
Handles rendering, animations, counters, filters, mobile navigation, and general UI behavior.

`assets/js/dashboard.js`
Controls the hidden admin dashboard used to update portfolio content directly in the browser.

`app.js`
Handles tab interactions and submits the contact form data to Google Sheets through a Google Apps Script endpoint.

## Run Locally

Because this is a static website, you can run it very simply:

1. Clone the repository.
2. Open the project folder.
3. Run a local server, or open `index.html` in your browser.

Example using VS Code Live Server:

1. Open the project in VS Code.
2. Right-click `index.html`.
3. Click `Open with Live Server`.

## Customization

To personalize the portfolio:

- Update the content in `assets/js/data.js`
- Change styling in `assets/css/style.css`
- Replace images in the `images/` folder
- Update the resume file path in `assets/js/data.js` or through the dashboard
- Update the contact form script URL in `app.js` if you use your own Google Apps Script

## Admin Dashboard

This project includes a hidden browser dashboard for editing portfolio content.

- Shortcut: `Ctrl + Shift + D`
- URL trigger: add `?admin=1` to the page URL

Important:

- The dashboard password is currently hardcoded in `assets/js/dashboard.js`
- Change it before using this project publicly as your own template
- Dashboard changes are saved in the browser using `localStorage`

## Deployment

This project can be deployed easily on:

- `Vercel`
- `Netlify`
- `GitHub Pages`

Since it is a static site, no backend server is required.

## Notes

- Portfolio data is browser-specific because it uses `localStorage`
- Clearing browser storage resets dashboard-managed content to defaults
- The contact form depends on the configured Google Apps Script endpoint being active

## Author

Syed Faizaan Ahmad

- GitHub: [Syedfaizaan2004](https://github.com/Syedfaizaan2004)
- Portfolio: [Live Website](https://syed-faizaan-ahmad-24df4388l-syedfaizaan2004s-projects.vercel.app/)

