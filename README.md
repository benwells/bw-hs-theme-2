# Navon Therapy HubSpot Theme

This project started as a basic HubSpot theme boilerplate and got converted to match the design from [navontherapy.com](https://www.navontherapy.com/) — a clean, minimal therapy website.

## What We Did

Basically took a Next.js site and rebuilt it as a HubSpot theme. The original site had simple React components and custom CSS, so we:

- Created new templates (`navon-home.html`, custom header/footer partials)
- Wrote fresh CSS (`navon-theme.css`) with the same color scheme and typography (Inter font, that nice teal accent color)
- Copied over images and icons (including Font Awesome for the little certificate icons)
- Set up proper HubSpot asset paths so everything shows up correctly

## Auto-Deploy Setup

A GH Action will automatically upload to HubSpot on push

**How it works:**
- Push to `main` → deploys to `bw-hs-theme-2`
- Push to other branches → deploys to `bw-hs-theme-2-dev`

**What you need:**
Add these secrets in your GitHub repo settings (Settings → Secrets and variables → Actions):
- `HUBSPOT_PORTAL_ID` - your HubSpot account ID
- `HUBSPOT_ACCESS_KEY` - your personal access key from HubSpot

## Local Development

```bash
# Install dependencies
bun install

# Build the Svelte components
bun run build

# Deploy to HubSpot manually (if you want)
bun run deploy
```

## Tech Stack

- **Framework:** HubSpot CMS (HubL templating)
- **Build:** Vite + Svelte (for web components)
- **Package Manager:** Bun
- **Deployment:** GitHub Actions + HubSpot CLI
- **Fonts:** Inter (Google Fonts), Font Awesome 4.7

## File Structure

- `/templates/navon-home.html` - Main single-page layout
- `/css/navon-theme.css` - All the custom styling
- `/templates/partials/header-navon.html` - Sticky navigation
- `/templates/partials/footer-navon.html` - Simple footer
- `/images/` - Photos, icons, assets

That's pretty much it. Clean theme, auto-deploys
