# NivAaran — India's First Complaint Intelligence System

> निवारण = Prevention + Resolution  
> **iDEA 2.0 · PS5 · Union Bank of India · Team Sankalpa**

---

## 🚀 Quick Start (3 commands)

```bash
npm install
npm start
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
nivaaran/
├── backend/
│   ├── server.js              ← Express server entry point
│   ├── routes/
│   │   ├── auth.js            ← POST /api/auth/login  POST /api/auth/register
│   │   ├── complaints.js      ← GET/POST/PATCH /api/complaints
│   │   ├── genome.js          ← GET /api/genome
│   │   ├── radar.js           ← GET /api/radar
│   │   ├── rbi.js             ← GET /api/rbi  POST generate-letter
│   │   ├── cls.js             ← GET /api/cls  POST retain
│   │   └── dashboard.js       ← GET /api/dashboard/summary
│   ├── models/
│   │   ├── User.js            ← Mongoose user model
│   │   └── Complaint.js       ← Mongoose complaint model
│   ├── middleware/
│   │   └── auth.js            ← JWT middleware + mock users
│   └── utils/
│       ├── mockData.js        ← In-memory data (works without MongoDB)
│       └── seed.js            ← Seeds demo users and complaints
├── frontend/public/
│   ├── index.html             ← Landing page
│   ├── login.html             ← Login / Register (calls real API)
│   ├── dashboard.html         ← Full dashboard (8 panels, real API)
│   ├── js/
│   │   └── api.js             ← API client (fetch + JWT)
│   └── assets/
│       └── logo.svg           ← NivAaran logo
├── .env                       ← Environment variables
├── .gitignore
└── package.json
```

---

## 🔐 Demo Login

| Role | Employee ID | Password |
|---|---|---|
| Agent | `DEMO-AGENT` | `demo123` |
| Manager | `DEMO-MGR` | `demo123` |
| Compliance Officer | `DEMO-CO` | `demo123` |

---

## ⚙️ Setup Options

### Option A — Without MongoDB (works immediately)
No MongoDB needed. The app uses in-memory mock data automatically.

```bash
npm install
npm start
# Open http://localhost:3000
```

### Option B — With MongoDB (full persistence)
1. Install MongoDB locally or get a free cluster at mongodb.com/atlas
2. Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/nivaaran
# OR for Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nivaaran
```
3. Run `npm start` — database is auto-seeded with demo data

### Development mode (auto-restart on file changes)
```bash
npm install -g nodemon   # only once
npm run dev
```

---

## 🌐 API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/login` | Login → returns JWT token |
| POST | `/api/auth/register` | Register new user |
| GET  | `/api/auth/me` | Get current user (auth required) |
| GET  | `/api/dashboard/summary` | Dashboard overview stats |
| GET  | `/api/complaints` | All complaints (filter: status, search) |
| POST | `/api/complaints` | Create new complaint |
| PATCH| `/api/complaints/:id/status` | Update complaint status |
| POST | `/api/complaints/:id/draft` | Generate AI response draft |
| GET  | `/api/genome` | All genome clusters |
| POST | `/api/genome/:id/fix` | Trigger root cause fix |
| GET  | `/api/radar` | Pre-complaint at-risk customers |
| POST | `/api/radar/:id/outreach` | Trigger outreach to customer |
| GET  | `/api/rbi` | All RBI countdown items |
| POST | `/api/rbi/:id/generate-letter` | Generate RBI Ombudsman letter |
| GET  | `/api/cls` | Customer loyalty scores |
| POST | `/api/cls/:id/retain` | Send retention offer |
| GET  | `/api/health` | Health check |

---

## 🚀 Deploy to GitHub Pages (Frontend Only)

For a static preview (no backend):

1. Copy the contents of `frontend/public/` to a new repo
2. Go to **Settings → Pages → Source: main → Save**
3. Live at `https://yourusername.github.io/nivaaran`

> Note: GitHub Pages only hosts static files. For the full API, use Render/Railway/Heroku below.

---

## 🌍 Deploy Full Stack (with API)

### Render.com (Free, recommended)
1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Environment variables**: Add your `.env` contents
5. Deploy — your API + frontend is live!

### Railway.app (Also free)
```bash
npm install -g railway
railway login
railway init
railway up
```

---

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| Forest | `#0D2B1F` | Primary dark, sidebar, CTAs |
| Green | `#16A34A` | Accents, success, section headings |
| Bright Green | `#22C55E` | Highlights, sidebar active |
| Gold | `#D97706` | Warnings, RBI alerts, highlights |
| Cream | `#F7F9F7` | Page background |

---

## 👥 Team Sankalpa

| Member | Role | Stack |
|---|---|---|
| **K. Krishnapriya** ⭐ Leader | Backend + AI | Node.js, MongoDB, Claude API |
| **Madhusree Rao** | Business + UX | Strategy, Frontend UI, BBA |
| **M. Arjun** | Frontend + Mobile | Vanilla JS, Flutter, UI/UX |

---

*"Banks spend crores resolving complaints one by one. NivAaran prevents the next thousand."*
