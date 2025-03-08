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
