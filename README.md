# SaaSify - AI SaaS Boilerplate

A modern, production-ready SaaS boilerplate built with Next.js 14, featuring AI integration, authentication, payments, and a beautiful dashboard UI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat-square&logo=supabase)

## ✨ Features

- **🤖 AI Chat Integration** - Built-in OpenAI-powered chat with multiple layout options
- **🔐 Authentication** - Complete auth flow with Supabase (sign in, sign up, password reset, social login)
- **💳 Payments** - Lemon Squeezy integration with subscription tiers (Starter, Professional, Enterprise)
- **🎨 Modern UI** - Beautiful dashboard with resizable panels, dark/light themes
- **📧 Email Composer** - Rich text email editor with preview functionality
- **📁 File Upload** - Drag-and-drop file upload with image gallery
- **🧩 UI Components** - Extensive collection of Radix UI primitives with shadcn/ui styling
- **📱 Responsive** - Fully responsive design with collapsible sidebar

## 🛠️ Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 14 (App Router) |
| Language         | TypeScript              |
| Styling          | Tailwind CSS            |
| UI Components    | Radix UI + shadcn/ui    |
| Authentication   | Supabase Auth           |
| Database         | Supabase                |
| AI               | OpenAI API              |
| Payments         | Lemon Squeezy           |
| State Management | TanStack Query          |
| Forms            | React Hook Form + Zod   |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key
- Lemon Squeezy account (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-saas-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Lemon Squeezy (optional)
   LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (signin, signup, reset-password)
│   ├── (dashboard)/     # Dashboard pages (home, chat, settings, etc.)
│   └── api/v1/          # API routes (ai, emails, payments)
├── components/
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── auth/            # Authentication components
│   ├── chat/            # AI chat components
│   ├── payment/         # Subscription & billing components
│   └── ...              # Feature-specific components
├── hooks/               # Custom React hooks
└── lib/                 # Utilities & configurations
```

## 📄 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🎯 Dashboard Pages

- **Home** - Main dashboard landing
- **AI Chat** - AI assistant with left/right layout options
- **Settings** - User profile & subscription management
- **Payments** - Subscription plans & billing
- **File Upload** - File management with drag-and-drop
- **Emails** - Email composer with rich text editor
- **Icons** - Icon library browser
- **Buttons** - Button component showcase

## 🔑 Authentication Flow

The app uses Supabase Auth with:

- Email/password authentication
- Social login providers
- Protected routes via middleware
- Password reset flow

## 📝 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and Supabase
