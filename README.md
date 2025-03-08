# Blog Project

An integrated full-stack blog website built with **FastAPI**, **PostgreSQL**, and **React**. This project features user authentication (JWT-based), blog post management (create, update, delete, view), threaded comments with reactions, full-text search, and user profile management. The frontend is built with React and is configured for static hosting (such as GitHub Pages), while the backend is a dynamic FastAPI server.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup & Running](#local-setup--running)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
  - [Deploying the Frontend to GitHub Pages](#deploying-the-frontend-to-github-pages)
  - [Deploying the Backend](#deploying-the-backend)
- [Environment Variables](#environment-variables)
- [License](#license)

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

## Project Structure

project-root/ ├── backend/ │ ├── .env # Environment variables (update with your credentials) │ ├── requirements.txt # Python dependencies │ ├── main.py # FastAPI entry point (with CORS & route integrations) │ ├── database.py # SQLAlchemy database setup │ ├── models.py # SQLAlchemy models for Users, Posts, Comments, Reactions │ ├── schemas.py # Pydantic schemas for input/output validation │ ├── auth.py # Authentication utilities (JWT creation/verification, password hashing) │ └── routes/
│ ├── users.py # Endpoints: signup, token, profile, dashboard │ ├── posts.py # Endpoints: create, read, update, delete posts │ ├── comments.py # Endpoints: add, list, delete comments (threaded replies) │ ├── reactions.py # Endpoints: add reactions (like/dislike, emoji-based) │ └── search.py # Endpoint: full-text search on posts └── frontend/ ├── package.json # NPM dependencies & scripts (with homepage field) ├── public/ │ └── index.html # HTML entry point └── src/ ├── index.js # React entry point ├── App.js # Main app with routing ├── api/ │ └── api.js # Axios instance configured to call your backend ├── components/ │ ├── Auth/ │ │ ├── Login.js # Login form component │ │ └── Signup.js # Signup form component │ ├── Posts/ │ │ ├── PostList.js # List all posts │ │ ├── PostDetail.js # Detailed view of a single post (with comments & reactions) │ │ └── PostEditor.js # Form to create/edit posts │ └── Comments/ │ ├── CommentList.js # Lists threaded comments for a post │ └── CommentForm.js # Form to add a new comment or reply ├── pages/ │ ├── Dashboard.js # User dashboard (manage own posts/comments) │ └── Profile.js # User profile (avatar, bio, social links) └── utils/ └── auth.js # Helper functions for token storage & auth management
