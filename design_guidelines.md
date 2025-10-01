# Fast Track 360 Consultancy - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium consultancy and coaching platforms (LinkedIn, MasterClass, BetterUp) combined with the specified red/black/white brand identity. The design emphasizes professionalism, trust, and expertise while maintaining approachability for career guidance seekers.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Primary Red: 0 84% 60% (vibrant, energetic accent)
- Background Black: 0 0% 8% (rich dark base)
- Surface Dark: 0 0% 12% (elevated surfaces, cards)
- Border Subtle: 0 0% 20% (dividers, outlines)
- Text Primary: 0 0% 98% (high contrast white)
- Text Secondary: 0 0% 70% (muted information)

**Light Mode**
- Primary Red: 0 84% 55% (slightly deeper for contrast)
- Background White: 0 0% 98% (soft white base)
- Surface Light: 0 0% 100% (pure white cards)
- Border Light: 0 0% 88% (subtle divisions)
- Text Primary: 0 0% 10% (near black)
- Text Secondary: 0 0% 40% (readable gray)

**Accent Colors** (Use Sparingly)
- Success Green: 142 76% 36% (for confirmations, completed states)
- Warning Amber: 38 92% 50% (for important notices)

### B. Typography
- **Headings**: Inter or Plus Jakarta Sans (700-800 weight) - modern, professional
- **Body**: Inter (400-500 weight) - excellent readability
- **Accents**: Space Grotesk (600 weight) for CTAs and labels - distinctive character
- **Scale**: H1: text-5xl/6xl, H2: text-3xl/4xl, H3: text-xl/2xl, Body: text-base/lg

### C. Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, m-8, gap-6, py-20)
- Section Padding: py-20 lg:py-32 for major sections
- Card Padding: p-6 lg:p-8
- Container Max-Width: max-w-7xl for full sections, max-w-4xl for content blocks

### D. Component Library

**Navigation**
- Sticky header with glassmorphism effect (backdrop-blur-lg)
- Logo left, menu center/right, "Book Free Call" CTA prominent (red button)
- Mobile: Hamburger menu with slide-in drawer

**Hero Section**
- Full-viewport hero with professional portrait image of Rita D'Souza
- Split layout: Image left (40%), content right (60%) on desktop
- Bold headline, supportive subtext, dual CTAs ("Book Free Call" + "Explore Services")
- Subtle animated elements (floating credentials badges, achievement numbers)

**Cards**
- Services: Elevated cards with hover lift effect, red accent border on hover
- Testimonials: Quote-style cards with client photo, name, role, company
- Blog: Image-top cards with category tag, title, excerpt, "Read More" link

**Forms**
- Contact form with floating labels, red focus states
- Payment forms with clear step indicators (Step 1/2/3)
- Input fields with subtle borders, bold focus outlines

**Modals**
- Blog reading modal with smooth slide-up animation
- Service details modal with pricing breakdown
- Booking modal with calendar integration preview

**Data Displays** (Admin Dashboard)
- Revenue chart: Line graph with red gradient fill
- Testimonial impact: Bar chart showing engagement metrics
- Order table with status badges (Pending/Completed/Failed)

### E. Animations
Use sparingly for professional polish:
- Fade-in on scroll for sections (duration-500)
- Card hover lift (transform translateY -2px)
- Button hover glow effect (red shadow spread)
- Modal entrance: slide-up with backdrop fade

## Page Structure

### Homepage Sections (7-8 comprehensive sections)

1. **Hero**: Full-screen portrait split with Rita's professional image, headline "Transform Your Career Journey", dual CTAs
2. **Trust Indicators**: Logo bar of companies Rita has worked with, statistics (500+ clients coached, 95% success rate)
3. **About Rita**: Two-column layout - professional bio left, credentials/certifications right with credential badges
4. **Services Showcase**: 3-column grid of service cards (Career Guidance, Workshops, 1-on-1 Coaching) with pricing preview
5. **Success Stories**: Testimonial carousel with 3 visible cards, auto-rotate with manual controls
6. **Blog/Insights**: Featured article hero + 3-column grid of recent posts with "View All Articles" CTA
7. **Social Proof**: Instagram feed integration showing workshop moments, LinkedIn presence
8. **Contact/CTA Section**: Split layout - contact form left, office info/map/social links right

### Payment Page
- Step indicator at top (Select Service → Payment Details → Confirmation)
- Service selection cards with pricing tiers
- Razorpay integration with secure payment badge indicators
- Order summary sidebar (sticky on desktop)

### Admin Dashboard
- Sidebar navigation (Dashboard, Content, Services, Testimonials, Blog, Orders)
- Dashboard cards showing KPIs (Total Revenue, Active Services, Blog Views, Pending Orders)
- Interactive charts using Chart.js or Recharts with red color scheme
- Data tables with search, filter, pagination

## Images

**Large Hero Image**: Yes - Professional portrait of Rita D'Souza (shoulder-up or full professional pose)
- Placement: Hero section, left side on desktop, top on mobile
- Style: High-quality professional photography with neutral/subtle background, well-lit

**Additional Images**:
- Service Icons: Custom illustrations in red/white for each service type
- Testimonial Avatars: Client headshots (can use placeholders initially)
- Blog Featured Images: Industry-relevant photography (career coaching, workshops, professional development)
- About Section: Secondary candid photo of Rita in coaching/workshop setting
- Social Proof: Real workshop photos, team collaboration images

## Interactive Elements

**CTAs**: Primary red buttons with white text, hover state with subtle glow
**Navigation**: Smooth scroll to sections with offset for fixed header
**Testimonials**: Swipeable carousel with dot indicators
**Blog Cards**: Hover reveals full excerpt with "Read More" expanding
**Service Cards**: Click reveals detailed modal with booking option
**Admin Tables**: Inline editing, sortable columns, quick action buttons

## Responsive Behavior
- Hero: Stacked layout on mobile (image top, content bottom)
- Service/Testimonial grids: 3 columns → 2 columns (md) → 1 column (mobile)
- Navigation: Full menu on desktop, hamburger on mobile
- Forms: Single column on mobile, maintain comfortable touch targets (min 44px)
- Dashboard: Collapsible sidebar on tablet/mobile

This design balances professional credibility with approachable warmth, using the red accent strategically to guide user actions while maintaining readability with the black/white foundation.