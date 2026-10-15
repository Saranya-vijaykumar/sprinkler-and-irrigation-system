# AquaFlow / HydroPro - Multipurpose Service Business & Smart Irrigation HTML5 Template + Admin Dashboard

**AquaFlow** is a modern, responsive HTML5 template engineered specifically for service-based businesses, with a dedicated high-converting niche layout for **Sprinkler & Irrigation System Installers** (Hot-Selling Category #25). It includes a full front-end marketing website alongside an **Admin Dashboard** suite, crafted to meet ThemeForest and TemplateMonster standards.

---

## 🌟 Key Features

- **15+ Clean, Semantic HTML5 Pages**:
  - `index.html` – Modern General Services Landing
  - `home-irrigation.html` – Category #25: Sprinkler & Irrigation System Specialist Niche Landing
  - `about.html` – About Us (Company Timeline, Team, Mission & Values)
  - `services.html` – Filterable Services Catalog (Residential, Commercial, Maintenance, Smart Tech)
  - `service-details.html` – Detailed Service Page with 4-phase process, specs, & FAQ accordion
  - `pricing.html` – Pricing Guide with seasonal blowout packages, Gold Care, & comparison table
  - `blog.html` – Filterable & searchable blog articles with category pills & pagination
  - `blog-details.html` – Single post with sticky table of contents, author bio, comments, & sidebar
  - `contact.html` – Assessment form, emergency hotline, & stylized coverage radar map
  - `login.html` & `register.html` – Accessible authentication views with split graphic branding
  - `404.html` – Branded error page with pipeline repair illustration & search recovery
  - `coming-soon.html` – Maintenance & countdown launch page with live ticking timer
  - `admin/index.html` – Operations Dashboard with Chart.js telemetry charts & recent bookings
  - `admin/users.html` – Directory management for technicians, auditors, & clients
  - `admin/orders.html` – Service dispatch tracking with live filter tabs & CSV export simulation
  - `admin/messages.html` – Split-pane customer inquiry inbox with quick responder

- **Dark & Light Mode Toggle**: Instant switch with smooth transition and `localStorage` persistence.
- **RTL (Right-to-Left) Language Support**: Native bidirectional layout support (`dir="rtl"`) ready for Arabic and Hebrew locales.
- **Interactive Water Savings Calculator**: Live slider calculating gallons conserved and estimated utility bill savings.
- **Before / After Lawn Visualizer**: Highlighting drought-stressed turf vs. precision rotary coverage.
- **Interactive Admin Charts**: Powered by Chart.js (monthly revenue curves & service category doughnut chart).
- **Zero Heavy Framework Bloat**: Pure, lightweight Vanilla JavaScript (`main.js` and `dashboard.js`).
- **Tailwind CSS Engine**: Fast styling with customized emerald, cyan, and teal color palettes.
- **Mobile-First Responsiveness**: Smooth off-canvas drawers, sticky headers, and responsive data tables.

---

## 📁 File Structure

```
sprinkler &irrigation system installer/
├── index.html                   # Home Page 1: General Services Landing
├── home-irrigation.html         # Home Page 2: Niche Sprinkler & Irrigation Installer
├── about.html                   # About Us
├── services.html                # Services Grid & List with Category Filters
├── service-details.html         # In-Depth Service Breakdown & FAQ Accordion
├── pricing.html                 # Tiered Pricing Guide & Comparison Matrix
├── blog.html                    # Blog Listing (Searchable & Filterable)
├── blog-details.html            # Single Blog Post with Sidebar & Comments
├── contact.html                 # Contact Us with Assessment Form & Map
├── 404.html                     # Branded 404 Error Page
├── login.html                   # User & Contractor Login
├── register.html                # User Registration
├── coming-soon.html             # Launch Countdown Page
├── admin/                       # Admin Dashboard Suite
│   ├── index.html               # Operations Analytics & Key Metrics
│   ├── users.html               # User & Personnel Directory
│   ├── orders.html              # Service Bookings & Field Dispatches
│   └── messages.html            # Customer Inquiries Split-Pane Inbox
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS, glassmorphism, scrollbars, & RTL rules
│   ├── js/
│   │   ├── main.js              # Theme manager, RTL switcher, drawers, accordions, calculator
│   │   └── dashboard.js         # Chart.js configs, table search, message reader
│   └── images/
│       └── logo.svg             # Vector brand mark
└── README.md                    # Buyer & developer documentation
```

---

## 🚀 Quick Start Guide

1. **Extract / Open Files**: Open any HTML file directly in any modern web browser (Google Chrome, Microsoft Edge, Safari, Mozilla Firefox).
2. **Local Development Server (Optional)**:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js npx serve
   npx serve .
   ```
3. Visit `http://localhost:8000` to browse the storefront, or `http://localhost:8000/admin/index.html` to access the admin dashboard.

---

## 🎨 Customizing Theme & Colors

### Changing the Primary Color
The template uses Tailwind CSS classes with customized `primary` (emerald) and `cyan` palettes defined in the `<head>` of each file:
```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#10b981', // Change to your brand color
          600: '#059669',
        }
      }
    }
  }
}
```

### Dark Mode & RTL Toggles
Theme preferences are stored automatically in browser `localStorage`:
- Key `theme`: stores `'dark'` or `'light'`.
- Key `direction`: stores `'ltr'` or `'rtl'`.

To set the template default to Dark Mode or RTL out-of-the-box, adjust the `<html>` tag:
```html
<html lang="en" class="dark" dir="rtl">
```

---

## 📄 Credits & Sources

- **CSS Framework**: [Tailwind CSS CDN](https://tailwindcss.com/)
- **Typography**: [Google Fonts (Plus Jakarta Sans & Outfit)](https://fonts.google.com/)
- **Icons**: [Font Awesome 6 CDN](https://fontawesome.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Images**: High-resolution royalty-free landscape & irrigation imagery from [Unsplash](https://unsplash.com/)

---

## 📜 Marketplace License
Suitable for Personal and Commercial client projects, ThemeForest, and TemplateMonster author listings.
Copyright © 2026 AquaFlow Technologies. All rights reserved.
