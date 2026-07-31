// ─────────────────────────────────────────────────────────────
//  portfolioData.js  —  Edit ALL your content here
//  Search for ✏️ to find every spot you need to personalise
// ─────────────────────────────────────────────────────────────

// ✏️ Your name (used in avatar + title)
export const NAME = {
  first: 'KOVID',
  last:  'REDDY',
  initial: 'K',
  tag: 'PROTAGONIST',
}

// ✏️ Wallet display (cosmetic — just a fun Persona flavour number)
export const WALLET = '¥ 3,000'

// ─── Menu sections (order matters — matches display order) ───
export const SECTIONS = [
  'SKILL',
  'ITEM',
  'PERSONA',
  'STATS',
  'QUEST',
  'SOCIAL LINK',
  'CALENDAR',
  'SYSTEM',
]

// ─── SKILL ───────────────────────────────────────────────────
export const SKILLS = [
  {
    group: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'Tailwind', 'JavaScript'],
  },
  {
    group: 'Programming',
    items: ['Java', 'Python', 'C'],
  },
  {
    group: 'Cybersecurity',
    items: ['Web Security Basics', 'HTB Learning', 'Networking'],
  },
  {
    group: 'AI / Computer Vision',
    items: ['YOLO', 'MediaPipe', 'Computer Vision'],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'DaVinci Resolve', 'AWS Basics'],
  },
]

// ─── ITEM (Projects) ─────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Cybersecurity Chatbot',
    tag:   'AI / Security',
    desc:  'Dataset-driven chatbot for cyber awareness and Q&A.',
    // ✏️ Link to your project repo or live demo
    link:  'https://github.com/kovid-reddy/cybersecurity-chatbot',
  },
  {
    title: 'Spotify Music Player',
    tag:   'Web App',
    desc:  'Custom interactive music player concept using Spotify API.',
    link:  'https://github.com/kovid-reddy/spotify-player',
  },
  {
    title: 'YOLO Medical Detection',
    tag:   'Computer Vision',
    desc:  'Object detection workflow focused on medical field use cases.',
    link:  'https://github.com/kovid-reddy/yolo-medical',
  },
  {
    title: 'Portfolio Website',
    tag:   'Creative / Web',
    desc:  "This Persona-style animated portfolio — the one you're looking at.",
    link:  'https://github.com/kovid-reddy/persona-portfolio',
  },
]

// ─── PERSONA (About) ─────────────────────────────────────────
// ✏️ Edit your bio here. Use \n for a new paragraph.
export const ABOUT = `Kovid Reddy is a developer-focused engineering student interested in frontend development, cybersecurity, AI/computer vision, and building creative interactive web experiences.\n\nCurrently in 3rd year, pushing the boundaries of what a portfolio can feel like — because a boring resume is just a missed boss fight.`

// Highlighted keywords that appear in cyan
export const ABOUT_HIGHLIGHTS = [
  'frontend development',
  'cybersecurity',
  'AI/computer vision',
  'Kovid Reddy',
]

// ─── STATS ───────────────────────────────────────────────────
export const STATS = [
  { name: 'Code',           value: 85 },
  { name: 'Design',         value: 75 },
  { name: 'Cybersecurity',  value: 70 },
  { name: 'AI / CV',        value: 65 },
  { name: 'Creativity',     value: 90 },
  { name: 'Learning Speed', value: 88 },
]

// ─── QUEST ───────────────────────────────────────────────────
export const QUESTS = [
  'Build a strong developer portfolio that stands out',
  'Learn cybersecurity deeply — HTB, CTFs, and beyond',
  'Create polished AI / computer vision projects',
  'Deploy production-grade apps on AWS',
  'Get internship-ready with real-world experience',
]

// ─── SOCIAL LINK ─────────────────────────────────────────────
// ✏️ Replace ALL links below with your real URLs
export const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/kovid-reddy',   // ✏️ replace
    icon:  'github',
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/kovid-reddy-kontham-13407b291/', // ✏️ replace
    icon:  'linkedin',
  },
  {
    label: 'Email',
    href:  'https://mail.google.com/mail/?view=cm&fs=1&to=kovidreddykontham@gmail.com',              // ✏️ replace
    icon:  'mail',
  },
  {
    label: 'Resume',
    href:  'https://kovidreddy.com/resume.pdf',       // ✏️ replace
    icon:  'file',
  },
]

// ─── CALENDAR ────────────────────────────────────────────────
export const CALENDAR = [
  {
    label: 'Internships',
    desc:  'Open to full-time or part-time developer internships.',
  },
  {
    label: 'Collaborations',
    desc:  'Happy to collaborate on open source & creative projects.',
  },
  {
    label: 'Freelance',
    desc:  'Available for web design and frontend development work.',
  },
  {
    label: 'AI / Security',
    desc:  'Actively exploring cybersecurity and computer vision experiments.',
  },
]

// ─── SYSTEM ──────────────────────────────────────────────────
export const SYSTEM_INFO = [
  { key: 'Framework',    value: 'React + Vite' },
  { key: 'Styling',      value: 'Tailwind CSS' },
  { key: 'Animation',    value: 'Framer Motion' },
  { key: 'Deployment',   value: 'AWS Amplify / S3 + CloudFront' },
  { key: 'Build Cmd',    value: 'npm run build' },
  { key: 'Output Dir',   value: 'dist/' },
]

export const DEPLOY_NOTES = `# AWS Amplify (recommended)
$ git push → connect repo in Amplify console
  Build command : npm run build
  Output folder : dist

# S3 + CloudFront
$ npm run build
$ aws s3 sync dist/ s3://your-bucket-name
  → Enable static website hosting on bucket
  → Attach CloudFront distribution
  → Invalidate cache: aws cloudfront create-invalidation --paths "/*"`

// ─── PARTY panel ─────────────────────────────────────────────
export const PARTY_MEMBERS = [
  { name: 'Developer',         initial: 'D', hp: 92, sp: 78 },
  { name: 'Designer',          initial: 'U', hp: 76, sp: 85 },
  { name: 'Security Learner',  initial: 'S', hp: 68, sp: 90 },
]
