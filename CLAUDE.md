# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**med.ContagiAd** — a static marketing website for a medical marketing agency targeting doctors/practitioners in India. Deployed on Vercel at `https://med.contagiad.com`.

## Development

**Run locally:**
```bash
node server.js
# Serves at http://localhost:3000
```

No build step. No package.json. No dependencies to install. All pages are plain HTML files with inline CSS and JS.

## Architecture

This is a **vanilla HTML/CSS/JS static site** with no framework, no bundler, and no CSS files — all styles are `<style>` blocks inside each HTML file.

**Pages:**
- `index.html` — main landing page (hero, services, testimonials, FAQ, CTA)
- `consultation.html` — booking form that submits to Google Sheets via Apps Script
- `free-ebook.html` — lead magnet page
- `privacy-policy.html`, `terms-and-conditions.html`, `cookie-policy.html` — legal pages

**Form submission (`consultation.html`):**
The consultation form sends a GET request to a Google Apps Script Web App URL (`SHEET_URL` constant near bottom of file). Data is appended to a Google Sheet. No server-side backend.

**Deployment (`vercel.json`):**
- `cleanUrls: true` — pages served without `.html` extension
- Static assets (images, JS, CSS, SVG, fonts) cached immutably for 1 year
- HTML files set to `no-cache` (always revalidate)

## Copywriting Rules

**Never use these phrases in any copy, captions, social posts, or web pages:**
- "India's Only" — do not use this claim
- "India's First" — do not use this claim
- "India-Wide" — do not use this claim

**CSS conventions:**
- CSS custom properties defined in `:root` — primary brand color is `--red: #c8372d`
- Font: Inter (loaded from Google Fonts with async/preload pattern to avoid render-blocking)
- GTM tag (`GTM-WSHSJCL6`) deferred via `requestIdleCallback`/`load` event to avoid blocking paint
