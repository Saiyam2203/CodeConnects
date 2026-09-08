# CodeConnects — Social Platform for Developers

A full-stack developer-focused social networking platform where developers can create profiles, connect with each other, share posts and projects, and engage through likes and comments.

Built with **React**, **Node.js**, **Express**, and **MySQL** — demonstrating real-world full-stack development, relational database design, authentication, REST APIs, and responsive UI.

---

## ✨ Features

- **Authentication** — Register, login, logout with JWT tokens and bcrypt password hashing
- **Developer Profiles** — Bio, skills, GitHub/LinkedIn links, profile images
- **Post Feed** — Create, edit, delete posts with real-time updates
- **Likes & Comments** — Like/unlike posts, add/delete comments
- **Project Showcase** — Share projects with descriptions, tech stacks, GitHub links, and live demos
- **Developer Search** — Find developers by name or skill
- **Follow System** — Follow/unfollow developers, view followers and following
- **Responsive Design** — Desktop, tablet, and mobile layouts with bottom navigation on mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, JavaScript, HTML5, CSS3, React Router 6, Axios |
| Backend | Node.js, Express.js, RESTful APIs |
| Database | MySQL (Relational) |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Dev Tools | Vite, Nodemon, Concurrently |

---

## 📁 Project Structure

```
CodeConnects/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (17+)
│   │   ├── pages/          # Page-level components (9)
│   │   ├── layouts/        # Layout wrappers (ProtectedLayout)
│   │   ├── services/       # API service layer
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── hooks/          # Custom hooks (useAuth)
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Root component with routing
│   │   └── main.jsx        # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route handlers (auth, user, post, etc.)
│   ├── routes/             # Express route definitions
│   ├── middleware/          # JWT auth middleware
│   ├── config/             # Database connection config
│   ├── server.js           # Express entry point
│   └── package.json
├── database/
│   ├── schema.sql          # MySQL table definitions
│   └── seed.sql            # Sample data
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
users (PK: id)
  ├── 1:N → posts (FK: user_id)
  │         ├── 1:N → comments (FK: post_id)
  │         └── M:N → likes (FK: post_id, user_id) [UNIQUE]
  ├── 1:N → projects (FK: user_id)
  ├── 1:N → comments (FK: user_id)
  └── M:N → connections (FK: follower_id, following_id) [UNIQUE, self-referencing]
```

### Tables

| Table | Key Columns | Relationships |
|-------|-------------|---------------|
| `users` | id, name, email, password, bio, skills | Central entity |
| `posts` | id, user_id, content | FK → users (1:N) |
| `projects` | id, user_id, title, technologies | FK → users (1:N) |
| `comments` | id, post_id, user_id, content | FK → posts, users |
| `likes` | id, post_id, user_id | FK → posts, users (UNIQUE pair) |
| `connections` | id, follower_id, following_id | Self-referencing M:N (UNIQUE pair) |

### DBMS Concepts Demonstrated

- **Primary Keys** — Auto-increment IDs on every table
- **Foreign Keys** — Referential integrity with ON DELETE CASCADE
- **UNIQUE Constraints** — Prevent duplicate likes and follows
- **CHECK Constraints** — Prevent self-following
- **Indexes** — On email, user_id, post_id, created_at for query optimization
- **Normalization** — 3NF, no redundant data storage
- **JOIN Queries** — Posts with user info, comments with authors, connections with user details
- **Aggregate Subqueries** — Like counts, comment counts, follower/following counts

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/auth/me` | Yes | Get current user |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users` | Yes | List all users |
| GET | `/api/users/search?q=` | Yes | Search users by name/skill |
| GET | `/api/users/:id` | Yes | Get user profile |
| PUT | `/api/users/:id` | Yes | Update own profile |

### Posts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts` | Yes | Get feed (all posts) |
| GET | `/api/posts/user/:userId` | Yes | Get user's posts |
| POST | `/api/posts` | Yes | Create post |
| PUT | `/api/posts/:id` | Yes | Update own post |
| DELETE | `/api/posts/:id` | Yes | Delete own post |

### Likes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/posts/:id/like` | Yes | Like a post |
| DELETE | `/api/posts/:id/like` | Yes | Unlike a post |

### Comments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/posts/:id/comments` | Yes | Get post comments |
| POST | `/api/posts/:id/comments` | Yes | Add comment |
| DELETE | `/api/comments/:id` | Yes | Delete own comment |

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | Yes | Get all projects |
| GET | `/api/projects/user/:userId` | Yes | Get user's projects |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update own project |
| DELETE | `/api/projects/:id` | Yes | Delete own project |

### Connections
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/:id/connect` | Yes | Follow user |
| DELETE | `/api/users/:id/connect` | Yes | Unfollow user |
| GET | `/api/users/:id/connections` | Yes | Get followers & following |

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v18+
- **MySQL** 8.0+
- **npm** v9+

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/codeconnects.git
cd codeconnects
```

### 2. MySQL Database Setup

Open MySQL shell or MySQL Workbench and run:

```sql
source database/schema.sql;
source database/seed.sql;
```

Or using the command line:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 3. Configure Environment Variables

Create `server/.env` file (use `.env.example` as reference):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=codeconnects
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 4. Install Dependencies

```bash
# Install all dependencies (root + client + server)
npm run install:all
```

Or install individually:

```bash
cd server && npm install
cd ../client && npm install
cd .. && npm install
```

### 5. Start the Application

```bash
# Start both frontend and backend
npm run dev
```

Or start individually:

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🔑 Sample Login Credentials

All seed users share the same password: `Password123!`

| Name | Email |
|------|-------|
| Alex Rivera | alex@codeconnects.dev |
| Samantha Chen | samantha@codeconnects.dev |
| Marcus Johnson | marcus@codeconnects.dev |
| Priya Patel | priya@codeconnects.dev |
| Jordan Williams | jordan@codeconnects.dev |

---

## 📱 Responsive Design

- **Desktop** — 3-column layout with sidebars
- **Tablet** — 2-column layout (right sidebar hidden)
- **Mobile** — Single column with bottom navigation bar

---

## 🔒 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- **JWT** authentication with 24-hour expiry
- Protected API routes via auth middleware
- **Parameterized queries** to prevent SQL injection
- Passwords never exposed in API responses
- Environment variables for secrets
- CORS configured for frontend origin only

---

## 🛣 Future Improvements

- Image upload support (profile pictures, post images)
- Real-time notifications using WebSockets
- Direct messaging between developers
- Post hashtags and filtering
- Pagination for feed and search results
- Email verification on registration
- Password reset functionality
- Admin dashboard
- Unit and integration tests

---

## 📝 Technical Concepts Demonstrated

This project demonstrates practical knowledge of:

1. **React** — Component architecture, hooks, Context API, React Router
2. **JavaScript** — ES6+, async/await, destructuring, modules
3. **HTML5** — Semantic elements, forms, accessibility attributes
4. **CSS3** — Custom properties, Flexbox, Grid, media queries, animations
5. **MySQL** — Relational schema, JOINs, constraints, indexing
6. **DBMS** — Normalization, ERD, 1:N/M:N relationships, ACID properties
7. **REST APIs** — CRUD operations, HTTP methods, status codes
8. **Authentication** — JWT, bcrypt, protected routes, middleware
9. **Responsive Design** — Mobile-first, breakpoints, adaptive navigation
10. **Clean Architecture** — MVC pattern, separation of concerns, service layer

---

## 📄 License

MIT
