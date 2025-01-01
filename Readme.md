# Blog Application

This is a full-stack Blog Application built using **React**, **Node.js**, and **MongoDB**. Users can sign up, log in, create, update, delete blogs, like other users' blogs, and comment on them.

## Features

- **Authentication**:
  - User Signup/Login with secure password hashing.
  - JWT-based authentication for secure sessions.

- **Blog Management**:
  - Create, Read, Update, and Delete blogs.

- **Interactive Features**:
  - Like other users' blogs.
  - Comment on blogs.

## Technologies Used

### Frontend
- **React**
  - React Router for navigation.
  - Axios for API requests.
  - Tailwind CSS (or other CSS frameworks) for styling (optional).

### Backend
- **Node.js** with Express.js
  - RESTful API structure.

### Database
- **MongoDB**
  - Mongoose for schema modeling.

### Authentication
- **JSON Web Tokens (JWT)** for authentication.

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- MongoDB

### Clone the Repository
```bash
git clone https://github.com/your-username/blog-application.git
cd blog-application
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
