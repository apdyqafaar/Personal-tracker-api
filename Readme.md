Personal Finance Tracker
A simple, fast personal finance tracker (React + Vite frontend, Express + Mongo backend) for tracking income and expenses with JWT auth, file upload, charts, and responsive UI.

Table of Contents
Features

Demo / Screenshots

Tech Stack

Getting Started

Prerequisites

Local Setup (backend)

Local Setup (frontend)

Environment Variables

Usage

Authentication

Create / Edit / Delete Transaction

Filtering & Analytics

API / Integration Notes

State Management

Testing & Linting

Deployment

Contributing

License

Contact

Features
JWT-based authentication (signup/login).

Create, edit, delete transactions with:

title, description, amount, type (income/expense), category, date.

Date picker (calendar), Select inputs integrated with React Hook Form.

Transaction filtering: Latest / Older / All, and type/category filters.

Analytics page (charts for income vs expense, category breakdown).

Profile image upload (Cloudinary).

Responsive UI (Tailwind + shadcn components).

React Query for network layer + optimistic UI / cache invalidation.

Zustand for in-memory client-side store (selected transaction, UI state).

Swagger/OpenAPI docs available on the backend (/api-docs).

Demo / Screenshots
Add screenshots or a live link here.

scss
Copy
Edit
![Dashboard](./screenshots/dashboard.png)
![Transactions List](./screenshots/transactions.png)
Tech Stack
Frontend

React + Vite

Tailwind CSS

shadcn/ui components (Radix primitives)

React Hook Form + Controller

React Query (TanStack Query)

Zustand (global in-memory store)

date-fns, lucide-react, sonner (toast)

Backend

Node.js + Express

MongoDB + Mongoose

JWT auth

Cloudinary for file uploads

Swagger (OpenAPI) for API docs

Getting Started
Prerequisites
Node.js >= 16

npm / yarn / pnpm

MongoDB (local or Atlas)

Cloudinary account (if using image upload)

Local Setup (backend)
bash
Copy
Edit
# Clone repository
git clone https://github.com/your-username/finance-tracker.git

# Install dependencies
cd finance-tracker
npm install
npm run dev
# open http://localhost:5173 (Vite default)
Environment Variables
Backend .env (example):

env
Copy
Edit
PORT=5000