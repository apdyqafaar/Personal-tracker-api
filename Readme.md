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
# in /server (or your backend folder)
cd server
npm install
# create .env (see below), then:
npm run dev
# or
node index.js
The backend runs on e.g. http://localhost:5000 (adjust PORT in env).

Local Setup (frontend)
bash
Copy
Edit
# in /client (or your frontend folder)
cd client
npm install
npm run dev
# open http://localhost:5173 (Vite default)
Environment Variables
Backend .env (example):

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/finance-db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Frontend .env (example for Vite):

env
Copy
Edit
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset  # if used
Make sure to never commit .env to Git.

Usage
Authentication
POST /auth/register — create account (name, email, password).

POST /auth/login — returns JWT token.

Token is stored client-side (in-memory Zustand or secured storage) and attached to Authorization: Bearer <token> for API requests.

Create / Edit / Delete Transaction
Create

Fill title, amount, type (income/expense), category, date.

Submit → React Query mutate triggers POST /trans.

On success: queryClient.invalidateQueries(["getAllTrans"]).

Edit

Click Edit on a transaction → prefill form (use reset() in react-hook-form).

Submit → call mutateAsync({ id, ...payload }) for PUT /trans/:id or similar.

In onSuccess invalidate the getAllTrans query.

Delete

Confirm deletion → call DELETE /trans/:id.

On success invalidate getAllTrans.

Example mutateAsync (update)
js
Copy
Edit
await updateTransMutation.mutateAsync({
  id: transId,
  title, amount, type, category, date
});
queryClient.invalidateQueries({ queryKey: ['getAllTrans'] });
Filtering & Analytics
Use the Select (Controller + shadcn <Select>) integrated with React Hook Form to filter.

Analytics page reads transactions and renders charts (income vs expense, categories).

API / Integration Notes
Swagger docs (if enabled): GET /api-docs (or your configured route).

File upload uses Cloudinary — either direct client upload or backend proxy depending on your security model.

When calling APIs from the client, use an Axios instance with default headers:

js
Copy
Edit
// services/api.js
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use(config => {
  const token = authStore.getState().token; // Zustand getState()
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
State Management
React Query: server state, fetching lists, creating/updating/deleting transactions.

Zustand: client state for ephemeral data (selected transaction for editing, UI flags). Example:

js
Copy
Edit
// stores/useTransStore.js
import { create } from 'zustand';
const useTransStore = create(set => ({
  transactions: [],
  selectedTrans: null,
  setTransactions: (t) => set({ transactions: t }),
  selectTrans: (id) => set(state => ({ selectedTrans: state.transactions.find(x => x.id === id) })),
  clearSelected: () => set({ selectedTrans: null })
}));
Testing & Linting
(If available)

bash
Copy
Edit
# run tests
npm test

# lint
npm run lint
Deployment
Deploy backend to Heroku / Render / Fly / DigitalOcean App Platform.

Deploy frontend to Vercel / Netlify / Cloudflare Pages.

Ensure production VITE_API_URL points to deployed backend and adjust CORS/ENV.

Contributing
Fork the repo

Create a feature branch

Make changes; add tests if applicable

Open a PR with a clear description

License
This project is available under the MIT License. See LICENSE for details.

Contact
Author: Your Name

Repo: https://github.com/your-username/your-repo

Email: you@example.com

