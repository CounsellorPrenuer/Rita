# Fast Track 360 Consultancy Platform

## Overview

Fast Track 360 is a professional coaching and consultancy platform for Rita D'Souza, a Certified Leadership Coach and Emotional Intelligence Trainer. The platform features a single-page application (SPA) with a modern, responsive design using a red/black/white color scheme. It includes a public-facing website showcasing services, testimonials, and blog content, along with a comprehensive admin dashboard for content management and an integrated Razorpay payment system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (SPA navigation)

**UI Component Library**
- Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom theming
- Design system following "New York" style variant with custom color palette
- Support for both light and dark modes through CSS custom properties

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- React Hook Form with Zod validation for form handling and validation
- Session-based authentication state managed through API queries

**Design System**
- Color palette: Primary red (0 84% 60%), background black (0 0% 8%), with carefully defined surface and text colors
- Typography: Inter for body text, Space Grotesk for CTAs and accents
- Responsive breakpoints using Tailwind's default system (mobile-first approach)
- Component architecture supporting glassmorphism effects and smooth animations

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM module system for modern JavaScript compatibility
- Session-based authentication using express-session with PostgreSQL storage

**API Design Pattern**
- RESTful API structure with clear endpoint organization:
  - `/api/auth/*` - Authentication endpoints (login, logout, check)
  - `/api/services/*` - Service CRUD operations
  - `/api/testimonials/*` - Testimonial management
  - `/api/blog-posts/*` - Blog content management
  - `/api/orders/*` - Payment order tracking
  - `/api/payments/*` - Razorpay integration endpoints

**Authentication & Authorization**
- Simple credential-based admin authentication (email/password)
- Session management with secure HTTP-only cookies
- Middleware-based route protection (`requireAdmin`) for admin endpoints
- Session store persisted in PostgreSQL for reliability

**Data Access Layer**
- Storage abstraction pattern (`IStorage` interface) for database operations
- Drizzle ORM for type-safe database queries and schema management
- CRUD operations encapsulated in `DbStorage` class implementation

### Data Storage

**Database Solution**
- PostgreSQL as the primary database (via Neon serverless PostgreSQL)
- WebSocket connection pooling for serverless compatibility
- Drizzle ORM for schema definition and migrations

**Schema Design**
- `services` table: Service offerings with pricing, features, and display ordering
- `testimonials` table: Client testimonials with images and display ordering
- `blog_posts` table: Blog content with slug-based routing, categories, and publish status
- `orders` table: Payment transactions with Razorpay integration tracking
- `admin_sessions` table: Session storage for PostgreSQL-backed sessions
- Built-in session table from `connect-pg-simple` for express-session

**Data Validation**
- Zod schemas generated from Drizzle schema using `drizzle-zod`
- Type-safe insert/update operations with runtime validation
- Consistent validation across frontend and backend

### External Dependencies

**Payment Integration**
- Razorpay payment gateway for processing service bookings
- Server-side order creation and signature verification
- Client-side Razorpay SDK loaded dynamically for payment UI
- Transaction status tracking (pending, paid, failed, refunded)

**Database Service**
- Neon Serverless PostgreSQL for scalable database hosting
- WebSocket-based connection pooling via `@neondatabase/serverless`
- Environment-based configuration through `DATABASE_URL`

**Development Tools**
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime error overlay)
- TSX for TypeScript execution in development
- ESBuild for production backend bundling

**Session Management**
- `connect-pg-simple` for PostgreSQL-backed session storage
- Automatic session table creation and management
- 7-day session expiration with secure cookie configuration

**Asset Management**
- Local image assets stored in `attached_assets` directory
- Path alias configuration (`@assets`) for easy imports
- Support for both uploaded images and generated content images