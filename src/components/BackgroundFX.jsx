// ─────────────────────────────────────────────────────────────
//  BackgroundFX.jsx  —  Visuals matching Persona 3 Reload
//  Features: Deep underwater blue, Tartarus stairs, vertical columns,
//            and Makoto Yuki style headphone protagonist silhouette (slanted/upside-down).
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

// Floating water bubbles matching P3 Reload underwater theme
function WaterBubble({ style, delay = 0, duration = 4 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(0,229,255,0.15) 70%)',
        border: '1px solid rgba(0,229,255,0.4)',
        boxShadow: '0 0 10px rgba(0,229,255,0.4)',
        ...style
      }}
      animate={{ 
        y: [0, -60, 0], 
        x: [0, 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.8, 0.4] 
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function BackgroundFX({ mouseX = 0, mouseY = 0 }) {
  const px = mouseX * 0.015
  const py = mouseY * 0.01

  return (
    <>
      {/* ── Base P3 Reload Underwater Deep Blue Gradient ── */}
      <div className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(180deg, #0d346c 0%, #031d44 35%, #010a1a 100%)',
          overflow: 'hidden'
        }}
      />

      {/* ── Light Rays/Sunbeams from top ── */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(0,229,255,0.55) 0%, rgba(0,85,255,0.18) 50%, transparent 80%)'
        }}
      />

      {/* ── Scanlines Overlay ── */}
      <div className="absolute inset-0 z-0 scanlines opacity-40" />

      {/* ── Tartarus Stairs and Ancient Greek Pillars ── */}
      <svg 
        className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none opacity-25"
        style={{ transform: `translate(${px * 0.4}px, ${py * 0.3}px)` }}
        viewBox="0 0 1000 1000" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Rising Staircase in Center */}
        <path d="M400 900 H600 L590 850 H410 L400 900 Z" fill="#00e5ff" opacity="0.3" />
        <path d="M410 850 H590 L580 805 H420 L410 850 Z" fill="#00e5ff" opacity="0.35" />
        <path d="M420 805 H580 L572 765 H428 L420 805 Z" fill="#00e5ff" opacity="0.4" />
        <path d="M428 765 H572 L565 730 H435 L428 765 Z" fill="#00e5ff" opacity="0.45" />
        <path d="M435 730 H565 L558 700 H442 L435 730 Z" fill="#00e5ff" opacity="0.5" />
        <path d="M442 700 H558 L552 673 H448 L442 700 Z" fill="#00e5ff" opacity="0.55" />
        <path d="M448 673 H552 L547 650 H453 L448 673 Z" fill="#00e5ff" opacity="0.6" />
        {/* Staircase perspective lines */}
        <line x1="400" y1="900" x2="480" y2="500" stroke="#00e5ff" strokeWidth="2" opacity="0.6" />
        <line x1="600" y1="900" x2="520" y2="500" stroke="#00e5ff" strokeWidth="2" opacity="0.6" />
        {/* Horizontal staircase lines leading to infinity */}
        <line x1="453" y1="650" x2="547" y2="650" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="456" y1="630" x2="544" y2="630" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="460" y1="612" x2="540" y2="612" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="463" y1="596" x2="537" y2="596" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="466" y1="582" x2="534" y2="582" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="469" y1="570" x2="531" y2="570" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />
        <line x1="472" y1="558" x2="528" y2="558" stroke="#00e5ff" strokeWidth="1" opacity="0.7" />

        {/* Tall Column Left */}
        <rect x="180" y="0" width="60" height="1000" fill="url(#colGrad)" opacity="0.7" />
        <line x1="180" y1="0" x2="180" y2="1000" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="200" y1="0" x2="200" y2="1000" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5,15" />
        <line x1="220" y1="0" x2="220" y2="1000" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5,15" />
        <line x1="240" y1="0" x2="240" y2="1000" stroke="#00e5ff" strokeWidth="1.5" />

        {/* Tall Column Right */}
        <rect x="760" y="0" width="60" height="1000" fill="url(#colGrad)" opacity="0.7" />
        <line x1="760" y1="0" x2="760" y2="1000" stroke="#00e5ff" strokeWidth="1.5" />
        <line x1="780" y1="0" x2="780" y2="1000" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5,15" />
        <line x1="800" y1="0" x2="800" y2="1000" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5,15" />
        <line x1="820" y1="0" x2="820" y2="1000" stroke="#00e5ff" strokeWidth="1.5" />

        {/* Gradients */}
        <defs>
          <linearGradient id="colGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Soft Cyan Ripple Glow Blobs ── */}
      <motion.div
        className="absolute z-0 rounded-full pointer-events-none"
        style={{
          width: 700, height: 700,
          top: '-15%', left: '15%',
          background: 'rgba(0,229,255,0.12)',
          filter: 'blur(120px)',
          x: px * 0.6,
          y: py * 0.6,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute z-0 rounded-full pointer-events-none"
        style={{
          width: 550, height: 550,
          top: '35%', right: '8%',
          background: 'rgba(0,85,255,0.16)',
          filter: 'blur(100px)',
          x: -px * 0.4,
          y: -py * 0.4,
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Angled left stripe zone (P3 Cyan & White dual slash) ── */}
      {/* 1. Underlying Cyan/Blue Slash */}
      <motion.div
        className="absolute z-1 top-0 bottom-0 bg-[#0088ff] shadow-2xl pointer-events-none"
        style={{
          left: '-2%',
          width: '38%',
          transform: 'skewX(-6deg)',
          transformOrigin: 'top left',
          x: px * 0.18,
          boxShadow: '10px 0 35px rgba(0,136,255,0.25)',
        }}
      />
      {/* 2. Top White Slash */}
      <motion.div
        className="absolute z-1 top-0 bottom-0 bg-white shadow-xl pointer-events-none"
        style={{
          left: '-5%',
          width: '35%',
          transform: 'skewX(-6deg)',
          transformOrigin: 'top left',
          x: px * 0.2,
        }}
      />
      {/* Inner subtle cyan panel edge */}
      <div
        className="absolute z-1 top-0 bottom-0 pointer-events-none"
        style={{
          left: '-3%',
          width: '35%',
          transform: 'skewX(-6deg)',
          transformOrigin: 'top left',
          background: 'rgba(0,229,255,0.02)',
          borderRight: '3px solid #00e5ff',
        }}
      />

      {/* ── Giant Vertical distressed Text "RELOAD" far left ── */}
      <div
        className="absolute z-1 pointer-events-none select-none font-head hidden md:block"
        style={{
          top: '0',
          bottom: '0',
          left: '1.2%',
          fontSize: '11vw',
          lineHeight: 0.9,
          color: 'rgba(0, 0, 0, 0.05)',
          writingMode: 'vertical-lr',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          transform: 'skewX(-6deg)',
          fontFamily: '"Black Han Sans", sans-serif',
        }}
      >
        RELOAD
      </div>

      {/* ── High-fidelity vector Makoto headphones protagonist SVG (SLANTED & UPSIDE DOWN) ── */}
      <svg 
        viewBox="0 0 500 800" 
        className="absolute top-[-30px] left-[-30px] w-[36%] h-auto z-2 pointer-events-none select-none opacity-95 hidden md:block"
        style={{ 
          transform: `translate(${px * 0.15}px, ${py * 0.08}px)`,
          transformOrigin: 'top left'
        }}
      >
        <g filter="url(#shadowFilter)">
          {/* Main Group rotated upside down / slanted to match reference */}
          <g transform="translate(250, 420) rotate(152) scale(1, -1) translate(-250, -350)">
            
            {/* Protagonist hair shadow silhouette */}
            <path d="M 120 530 C 180 500, 240 440, 250 380 C 260 320, 230 260, 270 210 C 310 160, 370 140, 380 180 C 390 220, 340 300, 330 340 C 320 380, 350 400, 330 450 C 310 500, 280 520, 260 570 C 240 620, 270 780, 270 780 H 0 Z" fill="rgba(0, 85, 255, 0.22)" />
            
            {/* Protagonist Main Body (Deep Navy/Black) */}
            <path d="M 80 570 Q 180 530, 210 470 T 250 300 Q 260 190, 340 150 Q 390 130, 370 200 T 310 390 Q 290 430, 280 500 T 240 620 Q 210 700, 220 800 H 0 Z" fill="#020924" stroke="#00e5ff" strokeWidth="2" />
            
            {/* Protagonist Face/Skin (Pure White high contrast) */}
            <path d="M 230 330 C 235 300, 250 250, 280 230 C 300 215, 330 200, 335 220 C 340 240, 310 270, 300 290 C 290 310, 275 350, 270 360 C 265 370, 240 375, 235 365 Z" fill="#ffffff" />
            
            {/* Cyan High-Contrast Hair Strands */}
            <path d="M 255 290 C 230 240, 260 190, 300 160 C 340 130, 380 140, 385 165 C 390 190, 320 260, 300 300 C 280 340, 255 380, 250 330 Z" fill="#00d2ff" opacity="0.9" />
            <path d="M 300 160 C 325 185, 310 245, 290 280 C 270 315, 240 340, 255 300 C 270 260, 285 200, 300 160 Z" fill="#ffffff" opacity="0.95" />

            {/* Cyan Sharp Eye (Facing downwards/right in transformed coordinates) */}
            <ellipse cx="282" cy="245" rx="5" ry="9" fill="#00e5ff" transform="rotate(-10 282 245)" />
            <ellipse cx="282" cy="245" rx="2" ry="5" fill="#ffffff" transform="rotate(-10 282 245)" />

            {/* Headphones vector outline (Makoto Yuki white headphones around neck/ears) */}
            <path d="M 215 440 Q 235 470, 255 450" stroke="#ffffff" strokeWidth="4.5" fill="none" />
            <path d="M 215 440 Q 235 470, 255 450" stroke="#00e5ff" strokeWidth="2" fill="none" />
            {/* Cup */}
            <ellipse cx="210" cy="425" rx="18" ry="28" fill="#ffffff" stroke="#00e5ff" strokeWidth="3" transform="rotate(22 210 425)" />
            <ellipse cx="210" cy="425" rx="10" ry="18" fill="#020924" stroke="#00e5ff" strokeWidth="2" transform="rotate(22 210 425)" />
            <line x1="210" y1="405" x2="210" y2="445" stroke="#00e5ff" strokeWidth="2.5" transform="rotate(22 210 425)" />

            {/* Dangling Audio Cords (Vibrant black/cyan lines flying out) */}
            <path d="M 210 450 Q 180 500, 150 480 T 100 580" fill="none" stroke="#020924" strokeWidth="4" />
            <path d="M 210 450 Q 180 500, 150 480 T 100 580" fill="none" stroke="#00e5ff" strokeWidth="2.5" />

            <path d="M 225 455 Q 190 530, 175 510 T 120 640" fill="none" stroke="#020924" strokeWidth="3.5" />
            <path d="M 225 455 Q 190 530, 175 510 T 120 640" fill="none" stroke="#ffffff" strokeWidth="2" />

            {/* Collar Skew Details */}
            <path d="M 195 500 L 235 470 L 225 540 Z" fill="#00e5ff" opacity="0.35" />
            
          </g>
        </g>
        
        {/* Filters */}
        <defs>
          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-6" dy="6" stdDeviation="8" floodColor="#00e5ff" floodOpacity="0.45" />
          </filter>
        </defs>
      </svg>

      {/* ── Vertical Accent Lines (Cyan/White) separating left slash ── */}
      <div className="absolute z-2 top-0 bottom-0 pointer-events-none"
        style={{ left: '34.5%', width: 1.5, background: 'linear-gradient(to bottom,transparent,rgba(0,229,255,0.9),transparent)' }}
      />
      <div className="absolute z-2 top-0 bottom-0 pointer-events-none"
        style={{ left: '35.5%', width: 1, background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.3),transparent)' }}
      />

      {/* ── Floating Water Bubbles (Authentic P3 Sea Vibe) ── */}
      <WaterBubble style={{ top: '10%', left: '6%', width: 16, height: 16 }} delay={0} duration={5.5} />
      <WaterBubble style={{ top: '60%', left: '31%', width: 24, height: 24 }} delay={1.2} duration={4.5} />
      <WaterBubble style={{ top: '75%', left: '14%', width: 12, height: 12 }} delay={0.6} duration={6} />
      <WaterBubble style={{ top: '8%', left: '24%', width: 20, height: 20 }} delay={2} duration={4.8} />
      <WaterBubble style={{ top: '40%', left: '10%', width: 28, height: 28 }} delay={3} duration={5} />
    </>
  )
}
