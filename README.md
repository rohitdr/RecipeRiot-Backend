# 🍽️ RecipeRiot Backend

Backend server for **RecipeRiot – Recipe Discovery & Management Platform** built with Node.js, Express, and MongoDB.


## 🚀 Overview

This backend handles recipe management, user interactions, and admin controls.

It provides APIs for:

* Recipe CRUD operations
* User management
* Comments & ratings
* Favorites system


## ⚙️ Tech Stack

* 🟢 Node.js
* 🚀 Express.js
* 🍃 MongoDB (Mongoose)
* 🔐 bcrypt (Password hashing)
* ☁️ Cloudinary (Image upload & storage)
* ✅ Express Validator (Request validation)


## ✨ Features

* 🍽️ Recipe Management (Add / Update / Delete)
* 🔍 Search & filter recipes
* ❤️ Like & favorite system
* 💬 Comment and rating system
* 👤 User profile management
* 🛠️ Admin controls for recipes & users
* 🖼️ Image upload using Cloudinary


## 🧠 Key Concepts

* RESTful API design
* CRUD operations with MongoDB
* Embedded comments & ratings schema
* Image handling with Cloudinary
* Validation middleware using Express Validator


## 📁 Folder Structure

```id="rrb1"
src/
├── routes/            # API routes
├── models/            # Mongoose schemas
├── middleware/        # Validation & auth
├── config/            # DB & Cloudinary config
├── index.cjs         # Entry point
```


## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 📌 Notes

* Keep all variable names in **UPPERCASE** for consistency
* Do not commit `.env` file to GitHub
* Restart server after updating environment variables


## ▶️ Getting Started

```bash id="rrb3"
git clone https://github.com/your-username/RecipeRiot-Backend.git
cd RecipeRiot-Backend
npm install
nodemon index.cjs
```


## 📡 API Endpoints (Sample)

### Recipes

* GET `/api/recipe/allRecipes` → Get all recipes
* POST `/api/recipe/addRecipe` → Add new recipe
* PUT `/api/recipe/updateRecipe/:id` → Update recipe
* DELETE `/api/recipe/like` → Like recipe

### Users

* GET `/api/auth/getUser` → Get logged user
* PUT `/api/auth/updateuser` → Update user

### Comments

* POST `/api/recipe/commentreicpe` → Add comment 


## 📌 Notes

* Comments & ratings are embedded within recipe documents
* Images are stored in Cloudinary
* Admin routes control recipe & user management

## 🌐 Live Links

- Backend API: https://reciperiot-backend.onrender.com 

## 🔗 Frontend Repository

👉 https://github.com/rohitdr/RecipeRiot-Frontend.git

## 📌 Note

This project was initially developed as a single full-stack repository combining both frontend and backend.
It has now been refactored into separate repositories for better scalability, maintainability, and cleaner architecture.

Due to this restructuring, the current repository may have a limited commit history.

👉 Original Monorepo: https://github.com/rohitdr/RecipeRiot.git

## 👨‍💻 Author

Rohit Kumar


## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
