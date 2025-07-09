# replit.md

## Overview

This is a full-stack web application for an Arabic cinema streaming platform called "أكاديمية السينما" (Cinema Academy). The application provides a comprehensive movie and TV show catalog with features for browsing, filtering, and managing multimedia content across different categories (movies, series, TV shows, and miscellaneous content).

## User Preferences

Preferred communication style: Simple, everyday language.
- User requested to remove dropdown menu from header
- User wants complete replication of ak.sv design
- User prefers Arabic communication

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom Arabic cinema theme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: REST API with structured routes

### Database Schema
- **Users**: Authentication and admin management
- **Content**: Movies, series, TV shows, and miscellaneous content
- **Categories**: Content categorization (Arabic, Foreign, Hindi, Turkish, etc.)
- **Genres**: Genre classification (Action, Comedy, Drama, etc.)
- **Relationships**: Many-to-many relations between content and genres/categories
- **Ratings**: User rating system

## Key Components

### Content Management
- **Content Types**: Movies, series, TV shows, and miscellaneous content
- **Filtering System**: Advanced filters by category, genre, year, language, quality, and rating
- **Search Functionality**: Content search across all types
- **Admin Panel**: Content creation, editing, and management interface

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Arabic Support**: RTL layout and Arabic typography
- **Dark Theme**: Custom dark theme optimized for cinema experience
- **Interactive Components**: Video player, content cards, filters, and pagination

### Authentication & Authorization
- **Admin System**: Simple admin authentication for content management
- **User Management**: Basic user system with roles (admin/regular users)

## Data Flow

1. **Content Browsing**: Users browse content through category pages (movies, series, TV, misc)
2. **Filtering**: Real-time filtering updates content grid via API calls
3. **Content Display**: Paginated content cards with poster images, ratings, and quality badges
4. **Admin Management**: Authenticated admins can create, edit, and delete content through dedicated admin panel

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider for production database
- **Drizzle Kit**: Database migrations and schema management

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for UI elements

### Development Tools
- **Vite**: Build tool with HMR and optimized bundling
- **TypeScript**: Type safety across frontend and backend
- **ESLint**: Code linting and formatting

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code for production deployment
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Local development server with HMR
- **Production**: Express server serving built frontend assets
- **Database**: Environment-based DATABASE_URL configuration

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Apply database schema changes

The application follows a modern full-stack architecture with strong TypeScript integration, efficient database queries, and a responsive Arabic-first user interface optimized for multimedia content consumption.