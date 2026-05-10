# Books Manager — React + Firebase SPA

Single Page Application built for **Web Engineering – Assignment 03**.

- ⚛️ React 18 + Vite
- 🧭 React Router DOM 6 (SPA routing with dynamic routes)
- 🔥 Firebase Firestore (full CRUD)
- 🎨 Plain CSS with custom design system

> Replace the placeholders below after you deploy and push to GitHub.

## 🔗 Live Project Link
<!-- Add your hosted URL at the very top of the report -->
**Live URL:** https://YOUR-LIVE-URL.web.app

## 💾 GitHub Repository Link
**Repo:** https://github.com/YOUR-USERNAME/YOUR-REPO

---

## Features / Assignment Tasks

### Task 1 — SPA Routing (React Router DOM)
| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Landing page |
| `/items` | `ItemsList` | View all items (card grid) |
| `/items/new` | `CreateItem` | Create new item form |
| `/items/:id` | `ItemDetail` | **Dynamic route** — single item view |
| `/items/:id/edit` | `EditItem` | Edit existing item |
| `*` | `NotFound` | 404 fallback |

A persistent `Navbar` (in `Layout`) wraps all routes via `<Outlet />`.

### Task 2 — Firestore CRUD
All Firestore calls live in `src/services/itemsService.js`:
- **Create** — `addDoc` into `items` collection (+ `serverTimestamp`)
- **Read all** — `getDocs` ordered by `createdAt` desc
- **Read single** — `getDoc` by document ID (via dynamic route `:id`)
- **Update** — `updateDoc` with a pre-filled form
- **Delete** — `deleteDoc` with immediate UI removal

### Task 3 — Deployment
Supports **Firebase Hosting** *and* **Vercel**. See below.

### Task 4 — GitHub
Push the entire folder to a fresh GitHub repo. `.gitignore` already excludes
`node_modules`, `dist`, `.env`, and Firebase debug files.

---

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Firebase
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Build > **Firestore Database** → create database (test mode is fine for the assignment).
3. Project settings → **Your apps** → add a Web app → copy the SDK config.
4. Copy `.env.example` → `.env` and fill in:
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

### 3. Run the dev server
```bash
npm run dev
```
Then open <http://localhost:5173>.

### 4. Production build
```bash
npm run build
npm run preview   # serves the built app locally
```

---

## Deploying

### Option A — Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting        # choose: use existing project, public dir = dist, SPA = Yes
npm run build
firebase deploy --only hosting
```
`firebase.json` is already configured to rewrite all routes to `/index.html`.

### Option B — Vercel
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Add the `VITE_FIREBASE_*` variables in **Settings → Environment Variables**.
5. Deploy. `vercel.json` already rewrites all paths to `/index.html` so deep
   links like `/items/:id` work on refresh.

---

## Project structure
```
.
├── index.html
├── package.json
├── vite.config.js
├── firebase.json          # Hosting config (SPA rewrites)
├── vercel.json            # Vercel SPA rewrites
├── .env.example           # copy to .env
└── src
    ├── main.jsx
    ├── App.jsx            # route definitions
    ├── firebase.js        # Firebase init + shared exports
    ├── components
    │   ├── Layout.jsx     # navbar + <Outlet />
    │   ├── ItemForm.jsx   # shared create/edit form
    │   └── Spinner.jsx
    ├── pages
    │   ├── Home.jsx
    │   ├── ItemsList.jsx
    │   ├── CreateItem.jsx
    │   ├── ItemDetail.jsx # dynamic route (/items/:id)
    │   ├── EditItem.jsx
    │   └── NotFound.jsx
    ├── services
    │   └── itemsService.js  # Firestore CRUD
    └── styles
        └── index.css
```

---

## Firestore data model
Collection: **`items`**
```js
{
  title: string,          // required
  author: string,         // required
  genre: string,
  year: number | null,
  description: string,
  createdAt: Timestamp,   // server-generated
  updatedAt: Timestamp,   // server-generated
}
```

## Firestore security rules (for demo only)
For grading, you can temporarily allow reads/writes:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{document=**} {
      allow read, write: if true;
    }
  }
}
```
> For production use, tighten these rules with authentication.
