# LinkMateAI Chatbot with Next.js and Sensay API

![Alt Text](/public/logo.png)

## Project Overview

A modern AI chatbot application built with Next.js that connects users through Sensay API, featuring multilingual support, customizable AI agents, and real-time conversation capabilities.

## Features ✨

- **Real-time AI conversations** powered by Sensay API
- **Multiple AI agents** with distinct personalities
- **Multilingual support** with language selector
- **Responsive UI** with typing indicators
- **Customizable settings** (themes, preferences)
- **Type-safe** implementation with TypeScript

## Project Structure

```

AI-CHATBOT/
├── .next/ # Next.js build output
├── node\_modules/
├── public/ # Static assets
├── src/
│   ├── app/ # Next.js app router
│   ├── api/ # API routes
│   ├── components/ # UI components
│   │   ├── AIAgentsList.tsx
│   │   ├── AIChat.tsx
│   │   ├── ChatContainer.tsx
│   │   ├── \[...]
│   ├── context/ # React context providers
│   ├── services/ # Business logic/services
│   │   └── replicaService.ts
├── globals.css # Global styles
├── layout.tsx # Root layout
└── \[...]

```

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Sensay API credentials

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AdekeyeAdeniyi/LinkMate.git
cd LinkMate
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file:

```env
ORGANIZATION_SECRET=*************************************
USER_SECRET=*************************************
API_VERSION=*************************************
```

4. Run the development server:

```bash
npm run dev
```

## Available Scripts

- `dev`: Starts development server
- `build`: Creates production build
- `start`: Runs production server
- `lint`: Runs ESLint

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Sensay API

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

[MIT](LICENSE)
