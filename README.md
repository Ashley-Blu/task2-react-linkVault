# Links-in: Personal Link Manager

A modern, responsive web application for organizing and managing your favorite links in one convenient place.

![Project Preview](https://socialify.git.ci/Ashley-Blu/task2-link-vault/image?language=1&owner=1&name=1&stargazers=1&theme=Light)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Usage](#usage)

## Features

- **User Authentication**: Secure registration and login system
- **Link Management**: Add, organize, and manage your favorite links
- **Password Reset**: Forgot password functionality with email verification
- **Responsive Design**: Fully responsive interface for desktop, tablet, and mobile devices
- **Local Storage**: All user data stored securely in browser's local storage

## Tech Stack

- **React 18**: Modern UI library with functional components and hooks
- **TypeScript**: Type-safe JavaScript development
- **React Router DOM**: Client-side routing and navigation
- **Vite**: Lightning-fast build tool and development server
- **CSS3**: Custom styling with mobile-first responsive design

## Project Structure

```
src/
├── Components/                 # React components
│   ├── AddLinkPage/           # Add new links page
│   ├── Landing/               # Landing/home page
│   ├── LinkPage/              # Display and manage links
│   ├── Login/                 # Login and password reset
│   └── SignUp/                # User registration
├── utils/
│   ├── auth.ts               # Authentication utilities
│   └── localStorage.ts       # Local storage helper functions
├── types/                     # TypeScript type definitions
├── assets/                    # Static assets (images, etc.)
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ashley-Blu/task2-link-vault.git
cd task2-link-vault
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build optimized production bundle
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview production build locally

## Usage

### Creating an Account

1. Click "Get Started" on the landing page
2. Fill in your email and password on the Sign Up form
3. Confirm your password and submit
4. You'll be redirected to your link management page

### Managing Links

1. Use the "Add Link" button to create new link entries
2. View all your links on the LinkPage
3. Edit or delete links as needed
4. All data is stored locally in your browser

### Password Reset

1. Click "Forgot Password?" on the login page
2. Enter your email address
3. Receive a reset token
4. Set your new password using the provided token

## Responsive Design

This application is fully responsive and works seamlessly across:

- **Desktop** (1200px and above)
- **Tablet** (768px - 1199px)
- **Mobile** (below 768px)

Each component includes media queries to ensure optimal viewing experience on all devices.

## License

This project is part of the mLab curriculum.
