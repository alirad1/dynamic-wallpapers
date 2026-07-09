# Dynamic Wallpapers

Daily-updating lock screen wallpapers generated from a URL: year calendar, life calendar, goal countdown, and progress tracker. No accounts, no database.

**Live:** [https://dynamicwallpapers.alirad.dev](https://dynamicwallpapers.alirad.dev)

## Why

Phone lock screens are glanced at dozens of times a day. A wallpaper that quietly shows how the year (or a goal) is progressing turns that habit into a gentle reminder, without another app or notification.

Point Shortcuts (iPhone) or MacroDroid (Android) at an image URL once. Re-fetch it daily and the PNG updates itself.

## Features

- **Year:** grid of days (past, today, future)
- **Life:** week squares from date of birth through a lifespan
- **Goal:** days remaining, progress arc, and label
- **Progress:** percent complete, bar, and date range
- Light and dark themes, device presets (Apple iPhone and iPad models, plus Android resolutions), custom width and height
- Live in-browser preview (rendered instantly, no server round-trips)
- Lock-screen safe layouts (content sits in the middle band below the clock)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## API

All routes return a **PNG**. Shared query params:

| Param | Default | Notes |
|-------|---------|-------|
| `width` | `1179` | 200 to 4000 |
| `height` | `2556` | 200 to 5000 |
| `theme` | `light` | `light` or `dark` |
| `color` | `green` | accent: `green`, `blue`, `purple`, `red`, or `black` |

Production host in examples: `https://dynamicwallpapers.alirad.dev`

### Year: `GET /api/year`

Optional: `year` (defaults to current year).

```
https://dynamicwallpapers.alirad.dev/api/year?width=1179&height=2556&theme=light
```

### Life: `GET /api/life`

| Param | Required | Notes |
|-------|----------|-------|
| `dob` | yes | `YYYY-MM-DD` |
| `lifespan` | no | years, default `90` (1 to 120) |

```
https://dynamicwallpapers.alirad.dev/api/life?dob=1995-06-15&lifespan=90&width=1179&height=2556&theme=dark
```

### Goal: `GET /api/goal`

| Param | Required | Notes |
|-------|----------|-------|
| `goal` | yes | label text |
| `goal_date` | yes | `YYYY-MM-DD` |
| `start_date` | no | defaults to today |

```
https://dynamicwallpapers.alirad.dev/api/goal?goal=Ship%20the%20product&goal_date=2026-12-31&start_date=2026-01-01&width=1179&height=2556
```

### Progress: `GET /api/progress`

| Param | Required | Notes |
|-------|----------|-------|
| `label` | yes | label text |
| `start_date` | yes | `YYYY-MM-DD` |
| `end_date` | yes | `YYYY-MM-DD` |

```
https://dynamicwallpapers.alirad.dev/api/progress?label=This%20year&start_date=2026-01-01&end_date=2026-12-31&width=1179&height=2556
```

## Phone setup

Use the on-site wizard for copyable URLs and step-by-step instructions.

**Critical:** when applying the lock screen image, disable **Crop to Subject** and **Show Preview** (or equivalent depth and subject effects). Those options crop or blur the wallpaper and break the layout.

- **iPhone:** Shortcuts automation, Get Contents of URL, Set Wallpaper Photo (Lock Screen), running daily.
- **Android:** MacroDroid (or similar) with a daily macro that downloads the image and sets the lock screen wallpaper.

## Deploy (Netlify + custom domain)

Next.js App Router and API routes work on Netlify with zero config (OpenNext adapter is applied automatically).

1. Import [alirad1/dynamic-wallpapers](https://github.com/alirad1/dynamic-wallpapers) into [Netlify](https://app.netlify.com).
2. Build settings (also in [`netlify.toml`](./netlify.toml)): build command `npm run build`, publish directory `.next`.
3. In the Netlify site, go to **Domain management** and add `dynamicwallpapers.alirad.dev`.
4. At your DNS provider (registrar or Cloudflare), create a **CNAME** for `dynamicwallpapers` pointing to the Netlify target shown in the UI (typically `your-site.netlify.app`).
5. Wait for SSL and DNS propagation, then confirm [https://dynamicwallpapers.alirad.dev](https://dynamicwallpapers.alirad.dev).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion for animation
- SVG layouts rendered to PNG via [sharp](https://sharp.pixelplumbing.com/) on the server, and inline for the live preview
- MIT License

## License

[MIT](./LICENSE)
