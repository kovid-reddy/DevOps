# Kovid Reddy — Persona-Style Portfolio

A Persona 3 Reload-inspired developer portfolio built with React + Vite + Tailwind CSS + Framer Motion.

---

## Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Customising Content

**All your content lives in one file:**
```
src/data/portfolioData.js
```

Search for `✏️` comments to find every spot you need to edit:
- Your name, initial, tag
- Social links (GitHub, LinkedIn, Email, Resume)
- Projects (title, tag, description, link)
- Skills, stats, quests, calendar entries

---

## Adding Your Photo

1. Put your photo in `public/avatar.jpg`
2. Open `src/App.jsx`
3. Find the comment `// ✏️ Replace this with your actual avatar/photo`
4. Replace the giant `K` letter with:

```jsx
<img
  src="/avatar.jpg"
  alt="Kovid Reddy"
  style={{ width:240, height:340, objectFit:'cover', objectPosition:'top' }}
/>
```

---

## AWS Deployment

### Option A — AWS Amplify (Recommended for Students)

1. Push this project to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click **New App → Host Web App**
4. Connect your GitHub repo
5. Configure build settings:
   - Build command: `npm run build`
   - Output folder: `dist`
6. Click **Save and Deploy**

Amplify gives you a live URL like `https://main.d1abc123.amplifyapp.com`.
Every `git push` auto-redeploys.

To connect a custom domain (e.g. `kovidreddy.dev`):
- Go to App Settings → Domain Management → Add Domain

---

### Option B — S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Create S3 bucket (replace with your bucket name)
aws s3 mb s3://kovid-portfolio --region us-east-1

# 3. Enable static website hosting
aws s3 website s3://kovid-portfolio --index-document index.html --error-document index.html

# 4. Upload dist folder
aws s3 sync dist/ s3://kovid-portfolio --delete

# 5. Make files public (set bucket policy in AWS Console or via CLI)
```

Then in AWS Console:
1. Go to CloudFront → Create Distribution
2. Origin domain: your S3 bucket website endpoint
3. Enable HTTPS (request a certificate via ACM — free)
4. Deploy and copy your CloudFront URL

When you update the site:
```bash
npm run build
aws s3 sync dist/ s3://kovid-portfolio --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Project Structure

```
src/
  components/
    App.jsx           ← root, wires everything
    BackgroundFX.jsx  ← scanlines, glow, parallax shapes
    Menu.jsx          ← vertical menu list
    Panel.jsx         ← content area (all 8 sections)
    PartyPanel.jsx    ← right slide-out party sidebar
    Icon.jsx          ← inline SVG icons (no CDN)
  data/
    portfolioData.js  ← ← ← EDIT YOUR CONTENT HERE
  main.jsx
  index.css
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Dev server + bundler |
| Tailwind CSS 3 | Utility styles |
| Framer Motion 11 | Animations |

---

Built with 🎮 Persona 3 Reload energy.
