# 📝 Notes App

A simple, interactive, and visually appealing notes application built with **React**, **Express.js**, **MongoDB**, and **Tailwind CSS**. This app supports adding, editing, deleting, and viewing notes with dark mode, dynamic themes, and Framer Motion animations.

---

## 🖼 Preview

#### Dekstop View
![Desktop View](https://raw.githubusercontent.com/hendrahend/notes-app/refs/heads/main/assets/screenshot1.png)
#### Mobile View
![Mobile View](https://raw.githubusercontent.com/hendrahend/notes-app/refs/heads/main/assets/screenshot2.png)

---

## 🚀 Features

- **Dynamic Themes**: Light, Dark, and System modes with smooth transitions.
- **CRUD Operations**: Add, edit, and delete notes.
- **Framer Motion Animations**: Enhanced interactivity with smooth animations.
- **MongoDB Integration**: Persistent storage for notes.
- **Responsive Design**: Fully responsive and mobile-friendly.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Vercel (Backend)

---

## 📦 Installation

Follow the steps below to run the project locally.

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas or local MongoDB setup
- Vercel CLI (optional for deployment)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hendrahend/notes-app-backend.git
   cd notes-app-backend
   ```
2. Install Dependency
   ```bash
   npm install
   ```
3. Create `.env` file and configure the following
   ```bash
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   ```
4. Start the server
   ```bash
   npm start
   ```
5. Server running at `http://localhost:5000`.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hendrahend/notes-app.git
   cd notes-app
   ```
2. Install Dependency
   ```bash
   npm install
   ```
3. Start the developmennt server
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`.

---

## 🖥️ Deployment

### Deploying Backend
1. Push your backend code to GitHub.
2. Deploy the backend to Vercel
3. Ensure the MONGO_URI environment variable is configured in Vercel.

### Deploying Frontend
1. Push your frontend code to GitHub.
2. Deploy the frontend to Vercel
3. Set the backend URL (http://your-backend-url/api/notes) in the frontend environment.

---

## 🖼 Demo

Check out the live demo:
- Frontend: [https://notes-app-nine-tawny.vercel.app](https://notes-app-nine-tawny.vercel.app/)
- Backend: [https://notes-app-backend.vercel.app](https://notes-app-backend.vercel.app/)
    
---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork this repository
2. Create some features or improvements
3. Commit & push
4. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](https://raw.githubusercontent.com/hendrahend/notes-app/refs/heads/main/LICENSE).

---

## ❤️ Acknowledgments

- Icons by [React Icons](https://www.npmjs.com/package/react-icons)
- Animation by [Framer Motion](https://www.npmjs.com/package/framer-motion)
- Styling by [TailwndCSS](https://tailwindcss.com)

Replace placeholders like `your_mongo_connection_string`, and deployment URLs with the actual ones for your project.
