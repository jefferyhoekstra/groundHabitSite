# GroundHabitSite

Posting app with authentication, a blog feed, and create/edit/delete.

## What it does

- Register + login
- View the blog feed (newest first)
- Create posts (author is set from the JWT on the server)
- Edit/delete your own posts

## Stack

**Frontend**

- React + Vite
- React Router
- Axios
- js-cookie + jwt-decode

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- bcrypt + jsonwebtoken

## Repo

```
backend/   # Express + Mongo API
frontend/  # React (Vite)
```

## Run locally

### Backend

1. Create `backend/.env`:

	```bash
	DB_URI=mongodb+srv://...your_mongo_connection...
	JWT_SECRET=your-secret
	```

2. Install:

	```bash
	cd backend
	npm install
	```

3. Start (port **3000**):

	```bash
	node server.js
	```

### Frontend

1. Install:

	```bash
	cd frontend
	npm install
	```

2. Optional: create `frontend/.env` to point at your local backend:

	```bash
	VITE_API_BASE_URL=http://localhost:3000
	```

3. Start Vite:

	```bash
	npm run dev
	```

## Config

**Backend** (`backend/.env`)

- `DB_URI` – MongoDB connection string
- `JWT_SECRET` – secret used to sign/verify JWTs

**Frontend** (`frontend/.env`)

- `VITE_API_BASE_URL` – backend base URL (example: `http://localhost:3000`)

If `VITE_API_BASE_URL` is not set, the frontend falls back to `https://ground-habit-site.vercel.app`.

## API

Base URL: `http://localhost:3000` (local)

- `POST /register`
  - body: `{ "username": string, "password": string }`
- `POST /login`
  - body: `{ "username": string, "password": string }`
  - returns: `{ message, token }`
- `GET /posts`
  - returns: list of posts (newest first)
- `POST /add-post` (auth required)
  - body: `{ "title": string, "text": string }`
  - author is taken from the verified JWT (`request.user.id`)
- `PATCH /posts/:id` (auth required, author-only)
  - body: `{ "title": string, "text": string }`
- `DELETE /posts/:id` (auth required, author-only)

## Notes

- Posts include timestamps via Mongoose (`createdAt`, `updatedAt`).

