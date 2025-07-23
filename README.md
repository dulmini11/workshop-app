# 🎓 React Workshop Web App

A responsive, single-page React application that allows users to browse, register, and leave feedback for various workshops — all simulated with local data. Built using modern front-end tools like Vite and React Router.

---

## 🚀 Live Demo

🌐 [Visit the App](https://your-vercel-link.vercel.app)

👤 **Login Info**  
- **Username**: domy  
- **Password**: 1234  

---

## 🧩 Features

✅ Browse workshops with search, filter, and sorting  
✅ View detailed info about each workshop  
✅ Register and unregister for workshops (stored in localStorage)  
✅ Submit feedback with rating and comment  
✅ View your registered workshops and feedback in **My Dashboard**  
✅ Smooth page transitions using Framer Motion  
✅ Responsive UI using custom CSS and media queries

---

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

🎯 Objective
Build a full-featured front-end React app (no backend) with the following capabilities:

Display workshop listings from local mock JSON

Allow users to search, filter, and sort workshops

Enable user registration/unregistration for workshops

Allow logged-in users to leave and view reviews

Display a personalized user dashboard showing registered workshops and user reviews

🔐 Mock Authentication
Authentication is simulated using mock data.

Only one mock user is available for demo purposes:

Username: domy

Password: 1234

No real signup or backend authentication is implemented in this version.

🧑‍💻 User Dashboard
The My Dashboard page allows logged-in users to:

View all registered workshops

See their own submitted reviews

Manage personal information (mocked)

Each review includes:

Workshop title

Rating (1-5 stars)

Feedback text

💾 Local Storage
All data such as:

Registered workshops

Submitted reviews

Logged-in user state

...is stored in the browser’s localStorage for demo purposes.

📌 Technologies Used
React

React Router

Vite

Framer Motion

Custom CSS

