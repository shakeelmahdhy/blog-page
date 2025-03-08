# Blog Website

An integrated full-stack blog website built with **FastAPI**, **PostgreSQL**, and **React**. This project features user authentication (JWT-based), blog post management (create, update, delete, view), threaded comments with reactions, full-text search, and user profile management. The frontend is built with React, while the backend is a dynamic FastAPI server.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Local Setup & Running](#local-setup--running)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Features

- **User Authentication:**  
  Sign up, login, and protected routes using JWT.

- **Blog Post Management:**  
  Create, update, delete, and view posts.  
  Supports Markdown/WYSIWYG editor integration (can be enhanced later).

- **Comments & Reactions:**  
  Add threaded comments and replies, with like/dislike (or custom emoji) reactions.

- **Full-text Search:**  
  Search posts using PostgreSQL’s text filtering (via ilike).

- **User Dashboard & Profile:**  
  Dashboard for managing personal posts and comments, along with profile customization (avatar, bio, social links).

## Prerequisites

- **Backend:**
  - Python 3.8+  
  - PostgreSQL
- **Frontend:**
  - Node.js (and npm)

## Local Setup & Running

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name/backend

2. **Create & Activate a Virtual Environment:**
   
```bash
python -m venv venv
source venv/bin/activate      # On Windows use: venv\Scripts\activate
```
3. **Install Dependencies:**
   
```bash
pip install -r requirements.txt
```
4. **Configure Environment Variables:**
   
Create a .env file in the backend/ folder with the following content (update the values accordingly):

```bash
DATABASE_URL=postgresql://user:password@localhost/blog_db
SECRET_KEY=your_secret_key
```

5. Ensure Your PostgreSQL Database is Running:
   
Create a database named blog_db (or update the DATABASE_URL in your .env file).

6. Run the Backend Server:

```bash
uvicorn main:app --reload
```
The FastAPI backend will be running on http://localhost:8000.


### Frontend Setup

1. **Navigate to the Frontend Folder:**

```bash
cd ../frontend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Configure the API URL:**
   
In src/api/api.js, ensure the baseURL is set to your backend URL for local development:
```bash
const api = axios.create({
  baseURL: 'http://localhost:8000',
});
```
4. **Start the React App:**

```bash
npm start
```
The React app will run on http://localhost:3000 and communicate with the backend at http://localhost:8000.
