# 💰 Personal Finance Tracker API

A secure and RESTful backend API built using **Node.js**, **Express**, **MongoDB**, and **Zod**, allowing users to track income, expenses, upload profile pictures, and view summaries. Includes full JWT authentication, admin access, and Swagger documentation.

---

## 🔧 Features

- ✅ User Registration & Login with JWT
- ✅ Role-based access (`user`, `admin`)
- ✅ Transactions: add, update, delete, and list
- ✅ Monthly summaries & category filtering
- ✅ Profile image upload via Cloudinary
- ✅ Admin dashboard to monitor all activity
- ✅ Input validation with Zod
- ✅ Swagger API documentation
- ✅ CORS, Helmet, Rate Limiting, Global Error Handling
- ✅ Deployed on Render with public API URL

---

## 🧩 Tech Stack & Dependencies

- **Express** – Web server
- **MongoDB + Mongoose** – Database
- **bcrypt** – Password hashing
- **jsonwebtoken** – JWT Auth
- **dotenv** – Environment config
- **Zod** – Input validation
- **Multer** – File upload middleware
- **Cloudinary** – Image storage
- **Swagger UI Express + yamljs** – API documentation
- **Helmet, morgan, express-rate-limit** – Security
- **CORS** – Cross-origin handling

---

## ⚙️ Project Setup

### 1. Clone Repo & Install Packages

```bash
git clone https://github.com/yourusername/Personal-tracker-api.git
cd Personal-tracker-api
npm install
