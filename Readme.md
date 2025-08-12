💰 Personal Finance Tracker
A full-stack personal finance tracking app built with React, Zustand, React Query, Tailwind CSS, and Express.
It allows users to track income & expenses, categorize transactions, and manage them with ease.

🚀 Features
🔐 Authentication
Sign up / Login with JWT-based authentication

Role-based access control (admin and user)

📊 Transaction Management
Create, edit, and delete transactions

Transaction details:

Title

Description

Amount

Type (Income / Expense)

Category (customizable)

Date selection with calendar picker

Form validation using React Hook Form

🎯 Filtering & Sorting
View latest, oldest, or all transactions

Filter transactions by type or category

🌙 Theme Support
Light, Dark, and System theme options

Custom text selection highlight color

💾 State & Data Management
React Query for fetching & mutating transactions

Automatic data refresh (invalidateQueries) after updates or deletes

Zustand store for managing selected transaction state

📱 Responsive UI
Shadcn UI components for a modern look

Fully responsive for desktop, tablet, and mobile

🛠 Tech Stack
Frontend:

React.js

Tailwind CSS

Zustand

React Query

React Hook Form

Shadcn UI

Backend:

Node.js & Express

MongoDB (Mongoose)

JWT Authentication

📦 Installation
bash
Copy
Edit
# Clone repository
git clone https://github.com/your-username/finance-tracker.git

# Install dependencies
cd finance-tracker
npm install

# Start development server
npm run dev
⚙️ Environment Variables
Create a .env file in the root of your backend folder and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000