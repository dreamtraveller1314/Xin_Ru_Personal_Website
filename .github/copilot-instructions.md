# Copilot Instructions for Xin Ru's Personal Website

## Project Overview
This is a single-page personal portfolio website for Xin Ru, a Malaysian Form 5 student interested in STEM and robotics. The site is a vanilla HTML/CSS/JavaScript project with a modern, responsive design focused on showcasing portfolio content and projects.

## Architecture & Key Files

**Site Structure:**
- **index.html** - Home page with hero section and featured project (Scratch Class)
- **portfolio.html** - About section with skills, achievements, and project galleries
- **chill.html** - Currently empty, likely for casual content or blog section
- **scratch.html** - Currently empty, likely for Scratch programming course details
- **style.css** - Global styling with responsive design for all pages (294 lines)
- **script.js** - Single JavaScript file handling header hide-on-scroll behavior
- **img/** - Contains hero-section_bg.jpg and scratch_poster.webp

## Design Patterns & Conventions

### Navigation & Page Structure
- **Multi-page site** with consistent header/footer across all pages
- All pages share the same `<header>` with 4-link navigation: Home, Portfolio, Chill, Scratch Class
- Navigation uses `class="active"` to highlight current page
- "Scratch Class" link has special styling: `class="nav-scratch"` (bordered button style)
- Footer uses non-standard custom element `<footer_but>` instead of semantic nav (inconsistency to be aware of)

### CSS Conventions
- Uses CSS custom animations: `fadeIn` for page load effects
- **Color palette**: 
  - Primary text: `#2d3436` (dark gray)
  - Secondary text: `#636e72` (medium gray)
  - Accent colors: `#95a5a6` (gray-blue), `#3498db` (blue)
  - Background: `#f5f6fa` (light gray), `#ffffff` (white)
- **Layout**: max-width 1200px centered containers
- **Responsive breakpoint**: Media query at 768px for mobile (flex-direction switches, images scale 100%)
- **Fixed header** with `z-index: 100` that hides on scroll (see JavaScript behavior below)

### JavaScript Behavior
- Single scroll listener tracking scroll direction
- Header slides up (transform: translateY(-100%)) when scrolling down past 100px
- Header slides back into view when scrolling up
- No external libraries; pure vanilla JavaScript

### Component Patterns
- **Hero sections**: Background image with darkening overlay (::before pseudo-element), centered white text
- **Project cards**: Flex layout with image + content, hover effect (transform: translateY(-5px))
- **Button styles**: Two variants - white buttons on heroes and gray buttons on cards
- **Info grid**: Grid layout for portfolio details with emoji icons

## Developer Workflow

No build system, testing framework, or package manager present. This is a static website:
- **Development**: Open HTML files directly in browser or use Live Server extension
- **Preview**: Any modern browser (responsive design tested at 768px breakpoint)
- **Deployment**: Copy all files to web server (static hosting)

## Critical Notes for AI Agents

1. **Empty pages to populate**: chill.html and scratch.html exist but are empty—these will need content matching the site's design patterns
2. **Footer element issue**: `<footer_but>` is a non-semantic custom element. Standard practice would be to use `<footer>` with a nav inside
3. **Active nav styling**: When adding pages, ensure to update the `class="active"` marker on the correct nav link in each HTML file
4. **Responsive images**: All images should be responsive; the CSS shows `width: 100%` on mobile
5. **Color consistency**: Maintain the established palette; avoid introducing new colors without updating the documentation
6. **No state management**: Pages are static; any future interactivity should use vanilla JS following the existing scroll-listener pattern

## File-Specific Guidance

- **style.css**: Global scope, affects all pages. Changes here impact layout/colors globally
- **script.js**: Currently minimal but is the place for any page-level interactivity
- **HTML files**: Each has identical header/footer structure; maintain consistency when editing navigation
