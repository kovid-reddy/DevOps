// ─────────────────────────────────────────────────────────────
//  Icon.jsx  —  All icons as inline SVG (no CDN dependency)
// ─────────────────────────────────────────────────────────────

export default function Icon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    style: { display: 'inline-block', flexShrink: 0 },
  }

  const stroke = { ...props, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

  const icons = {
    github: (
      <svg {...props}>
        <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C17.7 4.9 18.7 5.2 18.7 5.2c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
    linkedin: (
      <svg {...props}>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4v15h-4V8Zm7 0h3.8v2h.1c.5-1 1.8-2.3 3.8-2.3 4.1 0 4.8 2.7 4.8 6.2V23h-4v-8c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1V23h-4V8Z" />
      </svg>
    ),
    mail: (
      <svg {...stroke}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
    file: (
      <svg {...stroke}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    menu: (
      <svg {...stroke}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg {...stroke}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
    arrow: (
      <svg {...stroke}>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    external: (
      <svg {...stroke}>
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v7H3V3h7" />
      </svg>
    ),
  }

  return icons[name] || null
}
