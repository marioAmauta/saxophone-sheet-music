# 🎷 Saxophone Sheet Music

**Saxophone Sheet Music** is a modern web app that allows saxophonists to **find, like, download, and contribute** their favorite sheet music with ease.

Whether you're practicing for a concert, teaching students, or simply jamming for fun, this app helps you build a personal library of high-quality saxophone scores — all in one place.

Designed with musicians in mind, it features a clean UI, user authentication, file downloads, and multilingual support.

Built by a developer who is also a musician — for musicians around the world.

---

## 🚀 Tech Stack

- **Next.js** – Framework
- **TailwindCSS** – Styling
- **MongoDB** – Database
- **Prisma** – ORM
- **Shadcn** – UI Components
- **Uploadthing** – File Uploads
- **Better-Auth** – Authentication
- **Next-Intl** – Internationalization
- **Zod** – Validations
- **React-Hook-Form** – Forms
- **ESLint + Prettier** – Code Linting & Formatting
- **TypeScript** – Programming Language

---

## 📁 Folder Structure Highlights

- `/app` – Main Next.js app directory (App Router)
- `/components` – Reusable UI components
- `/hooks` – Reusable logic for components
- `/data-access` – Data access layer
- `/lib` – Utility functions
- `/i18n` – Internationalization setup and helpers
- `/prisma` – Prisma schema
- `/public` – Static assets

---

## 🌍 Features

- ✅ Clean, responsive UI
- ✅ Search, like, download, and contribute saxophone sheet music
- ✅ Authentication and role management
- ✅ Multilingual support
- ✅ Optimized performance
- ✅ Prettier and ESLint integration with Tailwind CSS support

---

## 🛠 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/saxophone-sheet-music.git
cd saxophone-sheet-music
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure your environment

Create a `.env` file based on `.env.example` and fill in your database credentials, UploadThing keys, auth secrets, etc.

### 4. Push Prisma schema

```bash
npx prisma db push
```

### 5. Run the dev server

```bash
npm run dev
```

---

## 🧪 Scripts

| Script                    | Description                       |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Start the development server      |
| `npm run build`           | Create a production build         |
| `npm run start`           | Start the production server       |
| `npm run lint`            | Lint the codebase                 |
| `npm run eslint:format`   | Auto-fix lint issues              |
| `npm run prettier:format` | Format code with Prettier         |
| `npm run prettier:check`  | Check formatting without applying |
