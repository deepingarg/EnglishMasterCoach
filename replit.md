# Speaking Coach App - Replit.md

## Overview

This is a React-based speaking coach application that helps users improve their English speaking skills through interactive lessons and activities. The app features speech recognition, progress tracking, and a gamified learning experience with XP points, streaks, and badges.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Structure
- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Routing**: Client-side routing with Wouter
- **State Management**: TanStack Query for server state management

### Directory Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utility libraries
│   │   └── hooks/        # Custom React hooks
├── server/               # Backend Express application
├── shared/               # Shared types and schemas
└── migrations/           # Database migration files
```

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling with CSS variables for theming
- **shadcn/ui** component library for consistent UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for efficient server state management and caching

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations with PostgreSQL
- **RESTful API** design for client-server communication
- **Modular route structure** with separate storage layer abstraction

### Database Design
- **Users**: Profile information, XP, streaks, skills tracking
- **Courses**: Structured learning content with difficulty levels
- **Lessons**: Daily lessons with content and XP rewards
- **Activities**: Speaking exercises (read aloud, picture talk, daily chat)
- **Progress Tracking**: User progress through lessons and activities
- **Badges**: Achievement system for motivation
- **Assessments**: Speech evaluation and feedback storage

### Speech Technology Integration
- **Web Speech API** for speech recognition
- **MediaRecorder API** for audio recording
- **Text-to-Speech** for pronunciation examples
- **Real-time transcript generation** during recording sessions

## Data Flow

### User Learning Journey
1. User selects a daily lesson or activity
2. Speech recorder captures user's speech
3. Audio is processed for transcript and analysis
4. Feedback is generated with scores for pronunciation, fluency, grammar, and vocabulary
5. XP and progress are updated in the database
6. User badges and achievements are evaluated and awarded

### API Communication
- Frontend makes REST API calls to Express backend
- TanStack Query handles caching and synchronization
- Server communicates with PostgreSQL through Drizzle ORM
- Real-time feedback provided through modal interfaces

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@radix-ui/***: Headless UI component primitives
- **@tanstack/react-query**: Server state management
- **Web APIs**: Speech Recognition, MediaRecorder, Text-to-Speech

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library
- **date-fns**: Date manipulation utilities

### Development Tools
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Vite dev server** for frontend development with HMR
- **tsx** for running TypeScript server code directly
- **Concurrent development** with both frontend and backend running simultaneously

### Production Build
- **Vite build** generates optimized frontend assets
- **ESBuild** bundles server code into distributable format
- **Static file serving** through Express in production
- **Environment-based configuration** for database connections

### Database Management
- **Drizzle Kit** for schema migrations and database management
- **PostgreSQL** as the primary database with connection pooling
- **Environment variables** for secure database configuration

### Replit Integration
- **Replit-specific plugins** for development tooling
- **Runtime error overlays** for better debugging experience
- **Cartographer plugin** for enhanced development workflow (development only)

The application is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, type safety throughout the stack, and a robust database schema that supports the gamified learning experience.