# 📌 Job Application Tracker

A full-stack web application to manage and track your job applications efficiently. Built using **ASP.NET Core Web API** and **React**, styled with **Material UI (MUI)**.

---

## ✨ Features

-  Add, edit job applications
-  View a list of all job applications
-  Sort by date, position, or application status
-  Pagination for easy navigation
-  Responsive and clean UI with Material UI
-  API error handling and input validation

---

## 🛠️ Tech Stack

**Frontend:**
- React (with Vite)
- Material UI (MUI)
- Axios

**Backend:**
- ASP.NET Core Web API
- Entity Framework Core
- SQLite

**Tools:**
- Visual Studio 2022
- Visual Studio Code
- Git + GitHub

### 📌 Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js & npm](https://nodejs.org/)
- Git

---

### Backend Setup

1. Open the solution in **Visual Studio 2022**
2. Set `JobApplicationTrackerAPI` as the **startup project**
3. Run the project  
   Swagger UI should be available at:  
   `https://localhost:44328/swagger`

---

### Frontend Setup

1. Open a terminal and navigate to the `client` folder:

   ```bash
   cd client
Install dependencies and start the development server:

bash
Copy
Edit
npm install
npm run dev
Visit the app at:
http://localhost:5173

📁 Project Structure
graphql
Copy
Edit
JobApplicationTracker/
├── JobApplicationTrackerAPI/      # ASP.NET Core Web API backend
│   └── Controllers/
│   └── Models/
│   └── Data/
│   └── Program.cs
│   └── ...
├── client/                        # React frontend
│   └── src/
│   └── components/
│   └── pages/
│   └── App.jsx
│   └── ...
└── README.md
🧩 Future Improvements
Add authentication (e.g., login/register)

Filter by job type (remote, onsite)

Unit and integration testing

👩‍💻 Author
Made with ❤️ by Swathy G
GitHub: Swathy Gopinath

