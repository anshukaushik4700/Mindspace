# 🌿 Mindspace

A full-stack **mental health web application** designed to provide a safe space for users to journal their thoughts and interact with a supportive chatbot.  
Built with **React.js, Hono, PostgreSQL, and Prisma**, and deployed on **Cloudflare Workers**.

## Deployment Links
- Frontend: https://9b1d07f7.mental-health-frontend.pages.dev
- Backend: https://mental-health-backend.anshukaushik4700.workers.dev

## 📌 Features

### 📝 Journaling
- Write daily journal entries with prompts like:
  - *How was your day?*
  - *How are you feeling?*
  - *What was good today?*
- View, edit, and delete past journal entries via a **history page**.

### 🤖 AI Chatbot
- Get supportive responses right after journaling.  
- Or chat anytime from the homepage for:
  - Relief & encouragement
  - Mental health tips
  - Coping strategies

### 🔐 Authentication
- Secure **JWT-based authentication**.
- OTP verification during signup.
- Password-protected user accounts.

### 💬 Conversation Storage
- Chatbot conversations are saved per user for reflection.  

### ⚡ Tech Stack
- **Frontend:** React.js (Vite + TypeScript)
- **Backend:** Hono (Cloudflare Workers)
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT, OTP email verification
- **Deployment:** Cloudflare Workers