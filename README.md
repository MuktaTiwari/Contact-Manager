# Contact Manager

A modern contact management application built with React, TypeScript, and Material UI, featuring state management with Zustand and data fetching with React Query.

## Features

- **CRUD Operations**: Create, read, update, and delete contacts
- **Favorites**: Mark contacts as favorites and filter by them
- **Search**: Real-time search functionality with debouncing
- **Pagination**: Paginated contact lists with responsive grid layout
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean Material UI interface with animations
- **Form Validation**: Robust form validation with React Hook Form



## Development Approach
## Architecture
 -  State Management:
        Zustand for global UI state (modals, filters)
        React Query for server state (contacts data)

 - Data Flow:
        Components → React Query hooks → API layer
        Shared state via Zustand store

## Key Decisions
    - Optimistic Updates: Contacts update       immediately while API calls happen in background

    - Debounced Search: 300ms delay to prevent excessive API calls

    - Modular Design: Components are split by responsibility (List, Card, Form)

    - Type Safety: Comprehensive TypeScript interfaces for all data structures



## Highlighted Features

## Performance Optimizations:
- React Query caching for instant navigation
- Virtualized lists for large contact collections
- CSS containment for smooth animations

## Accessibility:
- ARIA labels for all interactive elements
- Keyboard navigation support
- Color contrast compliant with WCAG AA

## Testing:
- Jest unit tests for critical components
- MSW for API mocking in tests
- Storybook for visual testing


## Technologies

| Category        | Technology          |
|----------------|--------------------|
| Frontend       | React 18 + TypeScript |
| State          | Zustand            |
| Data Fetching  | React Query        |
| UI Framework   | Material UI v5     |
| API Mocking    | JSON Server        |
| Styling        | CSS Modules        |
| Build Tool     | Vite               |

## Installation

## Clone repository
git clone https://github.com/yourusername/contact-manager.git
cd contact-manager

## Install dependencies
npm install

# Start development servers
npm run dev       # Frontend (port 5173)
npm run server    # Mock API (port 3001)


###  Open your browser to http://localhost:5173
contact-manager/
├── backend/                  # Node.js server
│   ├── node_modules/
│   ├── db.json               # Mock data (dev only)
│   ├── package.json
│   ├── server.js             # Express server
│   └── .env                  # Environment variables
│
└── contact-manager/          # React frontend
    ├── public/
    ├── src/
    │   ├── api/              # API calls and React Query hooks
    │   │   └── contacts.ts
    │   │
    │   ├── components/       # UI Components
    │   │   ├── AppLayout.tsx
    │   │   ├── ContactCard.tsx
    │   │   ├── ContactForm.tsx
    │   │   ├── ContactList.tsx
    │   │   ├── ContactModal.tsx
    │   │   └── SearchBar.tsx
    │   │
    │   ├── stores/           # Zustand state
    │   │   └── contactStore.ts
    │   │
    │   ├── styles/           # Component styles
    │   │   ├── AppLayout.module.css
    │   │   ├── ContactCard.module.css
    │   │   └── ... (other CSS modules)
    │   │
    │   ├── types/            # TypeScript types
    │   │   └── contact.ts
    │   │
    │   ├── utils/            # Utilities
    │   │   ├── queryClient.ts
    │   │   └── theme.ts
    │   │
    │   ├── App.tsx           # Root component
    │   └── main.tsx          # Entry point
    │
    ├── package.json
    └── vite.config.ts