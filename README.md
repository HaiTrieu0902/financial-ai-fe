# Personal Finance Management App with AI Chatbot

This project aims to build a Personal Finance Management web application with an integrated AI chatbot powered by GPT-4 (Azure OpenAI).

## Features

- **Personal Finance Management:** Manage budgets, expenses, income, and financial goals.
- **AI Chatbot:** Integrated GPT-4 chatbot for financial guidance and support.
- **User Authentication:** Includes user registration and login functionalities.
- **Internationalization (i18n):** Multilingual support using Next.js built-in internationalization.

## Tech Stack

- **Frontend:** Next.js, React.js
- **Styling/UI:** Material UI
- **Internationalization:** Next.js built-in Internationalization (i18n)
- **AI Integration:** Azure OpenAI GPT-4 (Provide your API key for setup)

## Pages and Components

- **Landing Page:** Introduction to app features and AI chatbot.
- **Authentication:** User registration and login pages.
- **Dashboard:** Personalized finance dashboard.
- **AI Chat Interface:** Interactive chat interface integrated into the dashboard.

## Setup Instructions

### Prerequisites

- Node.js (>=20.x)
- Azure OpenAI GPT-4 API key

### Getting Started

1. Clone the repository:

```bash
git clone <repo-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables by creating `.env.local`:

```env
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=your-api-endpoint
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Folder Structure

```
├── public
├── src
│   ├── app
│   │   └── [lang]
│   │       ├── _layouts
│   │       ├── (pages)
│   │       ├── [...notFound]
│   │       ├── auth
│   │       ├── error
│   │       ├── layout.tsx
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── assets
│   ├── components
│   ├── constants
│   ├── dictionaries
│   ├── hooks
│   ├── interface
│   ├── service
│   ├── utils
│   ├── i18n-config.ts
│   └── middleware.ts
├── .env
└── .env.development
```

Feel free to extend the application with additional features or improvements.

