# Dynamic Wallpapers

Lock screen wallpapers that update themselves every day. Pick something to track (the current year, your life in weeks, a countdown to a goal, or progress through any date range), point your phone at a URL, and the image quietly refreshes every morning. No app to install, no account, no database.

**Live site:** https://dynamicwallpapers.alirad.dev

## The idea

Most people glance at their lock screen dozens of times a day. I wanted that glance to carry a small bit of meaning, like a reminder that the year is 60% gone or that a deadline is 12 days away, without piling on another notification or app.

It all runs on one simple trick. An image URL renders a fresh PNG every time it is requested, so you set up a daily automation once (Shortcuts on iPhone, MacroDroid on Android) and then forget about it. The wallpaper keeps itself current.

## What it does

- **Year:** a grid of every day in the year, with the days so far filled in and today highlighted
- **Life:** one square for every week you have lived, counted from your date of birth
- **Goal:** a countdown ring to a date that matters, showing the days left
- **Progress:** a percent bar through any start and end date

Each style comes with light and dark themes, five accent colors, and resolution presets for common iPhone, iPad, and Android screens so nothing gets cropped.

## How it works

Every endpoint (`/api/year`, `/api/life`, `/api/goal`, `/api/progress`) takes a handful of query params and returns a PNG:

```
/api/goal?goal=Ship+the+app&goal_date=2026-12-31&theme=dark
```

The layout is drawn as an SVG on the server and rasterized to a PNG with sharp. The browser preview builds the exact same SVG on the client, so what you see while setting things up is what actually lands on your phone.

The hard part was text. When you rasterize SVG text on a server, the output depends on whatever fonts happen to be installed, which changes from one machine to the next. To get around that, I convert every label into vector path outlines from the real font file before rasterizing. The text then comes out pixel for pixel identical everywhere, with no font dependency at runtime.

## Tech stack

- **Next.js** (App Router) and **TypeScript**
- **Tailwind CSS** for the UI
- **Framer Motion** for the setup wizard
- **sharp** for SVG to PNG rasterizing
- **opentype.js** for converting text into font outlines
- Hosted on **Netlify**

## What I learned

- Rendering text reliably on a server is far trickier than it sounds. Outlining glyphs myself forced me to actually understand font units, glyph advances, and how a typeface turns into pixels.
- One source of truth is worth the effort. The same SVG builder feeds both the live preview and the final image, so the two can never fall out of sync.
- Fewer moving parts is a feature. Dropping accounts and a database kept the app cheap to run and pushed the real logic into small, pure functions that are easy to test.
- The last mile of UX is all details. Figuring out how to stop iOS from cropping the image took plenty of trial and error, and writing that up clearly saves every user the same frustration.

## License

MIT
