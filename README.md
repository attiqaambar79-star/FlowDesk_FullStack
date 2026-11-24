# FlowDesk – Full Stack Web Application

FlowDesk is a productivity and team-management app built by extending the original HTML/CSS landing page. The original blue/navy brand direction and supplied images are retained.

## Features
- Existing public pages: Home, Features, Pricing, About and Contact
- Account registration and login (JWT + bcrypt password hashing)
- Protected dashboard and profile
- Projects: create, read, update and delete
- Tasks: create, read, update and delete, status and priority
- Contact form API
- MongoDB database with Mongoose models
- Responsive layout

## Tech stack
HTML, CSS, vanilla JavaScript, Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

## Requirements
Install Node.js and MongoDB Community Server. Start the MongoDB service before running the app.

## Setup (Windows / VS Code)
1. Extract the ZIP.
2. Open the `Backend` folder in VS Code terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. In `.env`, set `MONGO_URI` and a private long `JWT_SECRET`.
6. Run `npm run dev` (or `npm start`).
7. Open `http://localhost:5000` in your browser.

## API endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (token required)
- `GET, POST /api/projects` (token required)
- `PUT, DELETE /api/projects/:id` (token required)
- `GET, POST /api/tasks` (token required)
- `PUT, DELETE /api/tasks/:id` (token required)
- `POST /api/messages`

## Notes
- The team page is currently an informational placeholder; invitations and role-based team management are a future milestone.
- Pricing is a presentation page only; no payment gateway is connected.
- This is a learning project. Before public deployment, configure a strong JWT secret, HTTPS, rate limiting, stricter validation, secure cookies/token handling and production CORS rules.
