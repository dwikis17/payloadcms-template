# PayloadCMS B2B Template - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- PostgreSQL database

### 1. Installation

```bash
# Clone/navigate to the project
cd payloadcms-template

# Install dependencies
pnpm install

# Generate TypeScript types
pnpm generate:types
```

### 2. Database Setup

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb payloadcms-template
```

**Option B: Use existing PostgreSQL**
Update `DATABASE_URL` in `.env` with your connection string.

### 3. Environment Configuration

The `.env` file has been created with secure secrets. Update these values:

```env
# Required
DATABASE_URL=postgresql://127.0.0.1:5432/payloadcms-template
PAYLOAD_SECRET=<already-set-secure-value>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional (for integrations)
RESEND_API_KEY=<your-resend-key>
STRIPE_SECRET_KEY=<your-stripe-key>
HUBSPOT_API_KEY=<your-hubspot-key>
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit:
- **Admin Panel:** http://localhost:3000/admin
- **Frontend:** http://localhost:3000

### 5. Create Admin User

On first visit to `/admin`, you'll be prompted to create an admin account.

---

## 📦 What's Included

### Collections (6 New)
- **Pricing** - Pricing plans with Stripe integration
- **Testimonials** - Client reviews with ratings
- **Courses** - Education tech course management
- **Products** - E-commerce product catalog
- **Services** - Agency service offerings
- **Orders** - Order management system

### Layout Blocks (6 New)
- **PricingTable** - Display pricing plans
- **Testimonials** - Show client testimonials
- **FeatureGrid** - Feature showcase grid
- **Stats** - Display key metrics
- **LogoCloud** - Client/partner logos
- **FAQ** - Frequently asked questions

### Page Templates (8 New)
- `/courses` & `/courses/[slug]` - Course catalog & details
- `/products` & `/products/[slug]` - Product catalog & details
- `/services` & `/services/[slug]` - Services listing & details
- `/pricing` - Pricing comparison page
- `/testimonials` - Client testimonials showcase

---

## 🎨 Using the Template

### Creating a Page with New Blocks

1. Go to http://localhost:3000/admin
2. Navigate to **Collections → Pages**
3. Click **Create New**
4. Add title and hero section
5. In the **Content** tab, add blocks:
   - **PricingTable** - Select pricing plans from collection
   - **Testimonials** - Choose testimonials to display
   - **FeatureGrid** - Add features with icons
   - **Stats** - Display metrics
   - **LogoCloud** - Add client logos
   - **FAQ** - Create Q&A section

### Creating Pricing Plans

1. Navigate to **Collections → Pricing**
2. Click **Create New**
3. Fill in:
   - Plan name, price, billing period
   - Features list (with checkboxes)
   - CTA button text and link
   - Mark as "highlighted" for featured plan
4. Save and publish

### Adding Courses

1. Navigate to **Collections → Courses**
2. Create course with:
   - Title, description, level
   - Instructor (select from Users)
   - Curriculum (modules with lessons)
   - Learning outcomes
   - Thumbnail image
3. Publish when ready

### Adding Products

1. Navigate to **Collections → Products**
2. Create product with:
   - Title, SKU, price
   - Multiple images
   - Variants (size, color, etc.)
   - Specifications
   - Related products
3. Set stock status and inventory

### Adding Services

1. Navigate to **Collections → Services**
2. Create service with:
   - Title, icon, description
   - Pricing (fixed/hourly/custom)
   - Deliverables list
   - Timeline estimate
   - Related case studies (from Posts)
3. Mark as featured if desired

---

## 🔧 Development Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm payload migrate:create  # Create migration
pnpm generate:types          # Generate TS types

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues

# Testing
pnpm test             # Run all tests
pnpm test:int         # Run integration tests
pnpm test:e2e         # Run E2E tests
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   ```
   DATABASE_URL
   PAYLOAD_SECRET
   NEXT_PUBLIC_SERVER_URL
   ```
4. Deploy!

### Railway

1. Create new project
2. Add PostgreSQL database
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Other Platforms

Works with any Node.js hosting that supports:
- Node.js 18+
- PostgreSQL
- Environment variables

---

## 📚 Industry-Specific Usage

### Education Tech
1. Create courses in **Courses** collection
2. Add instructor profiles (Users with public info)
3. Build curriculum with modules/lessons
4. Create pricing plans for course tiers
5. Add student testimonials

### E-commerce
1. Add products with variants
2. Set up pricing plans for subscriptions
3. Create order management workflow
4. Add product testimonials/reviews
5. Use related products feature

### Marketing Agencies
1. Create service offerings
2. Link case studies (Posts) to services
3. Set up flexible pricing (hourly/project/retainer)
4. Add client testimonials
5. Feature best services on homepage

---

## 🔌 Integrations

### Email (Resend)
1. Sign up at https://resend.com
2. Get API key
3. Add to `.env`: `RESEND_API_KEY=re_xxxxx`
4. Configure sender: `EMAIL_FROM=noreply@yourdomain.com`

### Payments (Stripe)
1. Sign up at https://stripe.com
2. Get API keys (test mode)
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```
4. Link pricing plans via `stripePriceId` field

### CRM (HubSpot)
1. Sign up at https://hubspot.com
2. Get private app access token
3. Add to `.env`: `HUBSPOT_API_KEY=pat-na1-xxxxx`
4. Set `CRM_ENABLED=true`

### Analytics (Google Analytics)
1. Create GA4 property
2. Get measurement ID
3. Add to `.env`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

---

## 🐛 Troubleshooting

### "Missing secret key" Error
- Ensure `.env` file exists in project root
- Verify `PAYLOAD_SECRET` is set
- Restart dev server after adding

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists: `createdb payloadcms-template`

### Build Errors
- Run `pnpm generate:types` after collection changes
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

### Type Errors
- Regenerate types: `pnpm generate:types`
- Check imports match generated types
- Restart TypeScript server in VS Code

---

## 📖 Documentation

- **Full Implementation Plan:** `/Users/dwiki/.claude/plans/compiled-sniffing-catmull.md`
- **Implementation Status:** `IMPLEMENTATION_STATUS.md`
- **Payload CMS Docs:** https://payloadcms.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎯 Next Steps

1. **Add Seed Data** - Populate collections with demo content
2. **Customize Design** - Update colors, fonts, logo
3. **Configure Integrations** - Set up email, payments, analytics
4. **Deploy** - Push to production on Vercel/Railway
5. **Add Content** - Create real pages, products, courses

---

## 💡 Tips

- Use **Live Preview** to see changes in real-time
- Enable **Drafts** to preview before publishing
- Use **Relationships** to connect content across collections
- Add **SEO fields** to all published content
- Organize media in **folders** for better management
- Use **Access Control** to restrict admin areas

---

## 🆘 Support

- **Payload Community:** https://discord.gg/payload
- **GitHub Issues:** Report bugs or request features
- **Documentation:** Check official Payload docs for detailed guides

---

**Template Version:** 1.0.0
**Last Updated:** January 2026
**Progress:** 45% Complete (Collections, Blocks, Page Templates)
