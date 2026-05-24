# Stryd - Developer Learning Platform

Stryd is an execution-based developer learning platform built with Next.js, TypeScript, Prisma, PostgreSQL, and Supabase.

It is designed to simulate real-world software development workflows where users progress by building, completing tasks, and shipping work instead of passively watching tutorials.

---

## 🧠 Why I built this

I built Stryd to explore how structured learning systems can be more practical and execution-focused. The goal was to move away from passive learning and instead create a system where progress is tied to real task completion and project-based learning.

---

## 🚀 Core Features

- Structured learning paths (ordered progression system)
- Stages and tasks with completion tracking
- User progress stored in PostgreSQL via Prisma
- Supabase authentication (signup, login, sessions)
- GitHub repository validation for unlocking stages
- Plan-based gating system (`free`, `basic`, `pro`)
- Focused learning mode for distraction-free task execution

---

## ⚙️ Tech Stack

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Supabase (Auth + SSR)
- Tailwind CSS

---

## 🔁 Core User Flow

1. User signs up or logs in via Supabase
2. User selects a learning path
3. Path contains ordered stages and tasks
4. User enters focused task view
5. User completes a task
6. Server action validates completion
   - checks authentication
   - optionally verifies GitHub repository
7. Progress is saved in PostgreSQL via Prisma
8. UI updates to reflect progress

---

## 🗄️ Database Overview

Main models:

- **Path** → top-level learning track
- **Stage** → grouped milestones inside a path
- **Task** → individual learning units
- **UserProfile** → stores GitHub username
- **UserProgress** → tracks completed tasks

Relationships:
- Path → Stages → Tasks
- User → UserProgress (many-to-many via tasks)

---

## 🔐 Authentication

Authentication is handled using Supabase:

- Server-side session validation
- Protected routes for authenticated users
- Secure logout and session handling

---

## 🧪 Key Technical Highlights

- Server Actions used instead of traditional REST APIs for mutations
- Prisma upserts used for safe progress tracking
- GitHub API validation for stage unlocking logic
- Route groups used for clean app structure:
  - `(auth)`
  - `(main)`
  - `(focus)`
- Server-side rendering for authenticated data fetching

---

---

## 🔄 Progress Tracking

Task completion is handled through server actions:

- Validates user session
- Checks optional GitHub repository requirements
- Uses Prisma `upsert` to prevent duplicate progress entries
- Revalidates affected pages after updates

---

## 📌 Current Status

This is an MVP in active development. The focus is on:
- improving system clarity
- refining learning flow
- strengthening backend structure
- making progression logic more realistic

---

## 🚀 Future Improvements

- Better analytics for learning progress
- Improved GitHub integration
- More advanced path personalization
- Real-time collaboration features
- Enhanced onboarding flow

---

## 🤝 Tech Philosophy

Stryd is built with a focus on:
- simplicity in user flow
- real-world development patterns
- backend clarity over complexity
- execution-driven learning

---