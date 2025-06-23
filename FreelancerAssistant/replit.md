# Replit Project Documentation

## Overview

This project is a professional psychology practice website for **Manuel Alberto Mella Ibaceta**, a psychologist offering integrative therapy services. The application serves a static HTML/CSS/JavaScript website with an elegant design focused on mental health services, featuring comprehensive pricing options and emergency support functionality.

## System Architecture

### Full-Stack Architecture
- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

### Current Implementation Status
The project appears to be in early development stages with:
- Complete UI component library setup (shadcn/ui)
- Database schema and ORM configuration ready
- Express server structure established
- Static HTML/CSS files for the psychology website present (likely legacy or design reference)

## Key Components

### Frontend Structure
- **Component Library**: Full shadcn/ui implementation with 40+ reusable components
- **Styling System**: Tailwind CSS with custom design tokens and responsive utilities
- **TypeScript Configuration**: Strict type checking with path aliases for clean imports
- **Build System**: Vite with React plugin and development optimizations

### Backend Structure
- **Server Framework**: Express.js with TypeScript support
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstract storage pattern with in-memory implementation for development
- **API Structure**: RESTful endpoints with `/api` prefix convention
- **Development Tools**: Hot reload and error handling middleware

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Migration System**: Drizzle Kit for database schema management
- **Type Safety**: Zod schemas for runtime validation and TypeScript inference

## Data Flow

### Client-Server Communication
- **API Requests**: Custom fetch wrapper with credential handling and error management
- **Query Management**: TanStack Query for caching, synchronization, and background updates
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Error Handling**: Centralized error boundaries and toast notifications

### Development Workflow
- **Hot Reload**: Vite development server with HMR for React components
- **Type Checking**: Continuous TypeScript compilation checking
- **Database Operations**: Drizzle Kit for schema changes and migrations

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with hooks, React DOM, React Query
- **Node.js Runtime**: Express server with TypeScript execution via tsx
- **Database**: Neon PostgreSQL serverless database connector

### UI and Styling
- **Design System**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

### Development Tools
- **Build Tools**: Vite, esbuild for production builds
- **Type Safety**: TypeScript, Zod for runtime validation
- **Code Quality**: ESLint configuration (implied by React setup)

## Deployment Strategy

### Replit Configuration
- **Environment**: Node.js 20, Web, PostgreSQL 16 modules
- **Development**: `npm run dev` starts concurrent frontend/backend development
- **Production Build**: Vite build + esbuild server compilation
- **Deployment Target**: Autoscale deployment with optimized builds

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server with external packages
3. **Database**: Drizzle migrations applied via `db:push` command
4. **Static Serving**: Express serves built frontend assets in production

### Environment Configuration
- **Development**: Hot reload, source maps, development optimizations
- **Production**: Minified builds, optimized assets, production database connections
- **Database**: Environment-based DATABASE_URL configuration

## Changelog

```
Changelog:
- June 23, 2025. Initial setup with React/Express full-stack architecture
- June 23, 2025. Converted to static HTML psychology website with elegant mental health color palette
- June 23, 2025. Updated hero section messaging and added comprehensive pricing structure
- June 23, 2025. Implemented emergency support feature with modal form for urgent orientations
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```