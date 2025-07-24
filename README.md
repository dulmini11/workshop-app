# 🎓 React Workshop Web App

A responsive, single-page React application that allows users to browse, register, and leave feedback for various workshops — all simulated with local data. Built using modern front-end tools like Vite and React Router.

---

## 🚀 Live Demo

🌐 [Visit the App](https://workshop-app-qzum.vercel.app)

👤 *Login Info*  
- *Username*: domy  
- *Password*: 1234  

---

## 🧩 Features

✅ Browse workshops with search, filter, and sorting  
✅ View detailed info about each workshop  
✅ Register and unregister for workshops (stored in localStorage)  
✅ Submit feedback with rating and comment  
✅ View your registered workshops and feedback in *My Dashboard*  
✅ Smooth page transitions using Framer Motion  
✅ Responsive UI using custom CSS and media queries

---
##🎯 Objective
Build a React-based workshop platform with the following core features:

Display workshop listings from local mock JSON

Allow users to search, filter, and sort workshops

Enable registration/unregistration for workshops

Logged-in users can leave and view reviews

A personalized dashboard for managing activities
---

##🔐 Mock Authentication
This project uses mock authentication with localStorage and hardcoded demo credentials:

Username: domy

Password: 1234

There is no real signup or backend in this version.
---

##🧑‍💻 User Dashboard
The "My Dashboard" page allows users to:

View registered workshops

See their own submitted reviews

Manage (mock) user details

Each review includes:

Workshop title

Star rating (1–5)

Feedback text
---

##💾 Local Storage
All interactions and state updates are saved to localStorage, including:

Logged-in user session

Registered workshops

Submitted reviews
---

##📌 Technologies Used
React

React Router

Vite

Framer Motion

CSS

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/workshop-app.git
cd workshop-app
cd frontend
npm install
npm run dev

src/
├── assets/              # Images and static assets
├── components/          # Reusable UI components (Navbar, ReviewForm, etc.)
├── context/             # Global state management
├── data/                # JSON mock data for users and workshops
├── pages/               # Page-level components (Home, Dashboard, Details, Login)
├── App.jsx              # Root component with routing
└── main.jsx             # Entry point
---

