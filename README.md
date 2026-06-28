# Task Tracker (MERN)

A full-stack Task Tracker web application I built using the MERN stack to manage daily tasks efficiently.

## Tech Stack
- **Frontend**: React.js, Vite, Framer Motion, Vanilla CSS (Glassmorphism & Modern UI), Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Database**: MongoDB

## Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Form Validation**: robust validation in frontend and backend.
- **RESTful API**: Standardized backend architecture.
- **Dynamic Updates**: Real-time state updates without page refreshes.
- **Responsive UI**: Clean, mobile-friendly design with a minimalist dark mode aesthetic.
- **Bonus Features**:
  - Filter by status and priority
  - Sort by date and priority
  - Reusable components (`TaskCard`, `TaskForm`)
  - Environment variables configured

## How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB installed locally (or update the `.env` with an Atlas URI)

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root and set your environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/tasktracker
   ```
4. Run the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.

## Deployment Instructions

### Deploying the Backend (e.g., Render)
1. Push your code to a GitHub repository.
2. Log in to [Render](https://render.com/).
3. Create a new "Web Service" and connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `node server.js`.
7. Add your Environment Variables (`MONGODB_URI` using MongoDB Atlas).
8. Click "Create Web Service". Render will provide a public URL (e.g., `https://your-backend.onrender.com`).

### Deploying the Frontend (e.g., Vercel)
1. Update `API_URL` in `frontend/src/App.jsx` to the public backend URL you got from Render.
2. Log in to [Vercel](https://vercel.com/).
3. Click "Add New..." -> "Project" and import your GitHub repository.
4. Set the Framework Preset to "Vite".
5. Set the Root Directory to `frontend`.
6. Click "Deploy". Vercel will provide a public URL.
