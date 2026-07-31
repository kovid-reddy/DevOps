// ─────────────────────────────────────────────────────────────
//  Menu.jsx  —  Persona 3 Reload style menu
//  Changes from previous:
//  - Hover: replaces the full white rectangle with a thin
//    cyan left-border slash + subtle cyan glow, no bg block
//  - Active: keeps white backing + pink line (unchanged)
//  - Hover slide is snappier and doesn't overshoot
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function Menu({ sections, activeIdx, onSelect }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div className="flex flex-col gap-2 md:gap-3 select-none">
      {sections.map((section, i) => {
        const isActive  = i === activeIdx
        const isHovered = i === hoveredIdx
        const indentOffset = i * 16

        const textColor = isActive
          ? '#000000'
          : isHovered
            ? '#ffffff'
            : '#38bdf8'

        return (
          <motion.button
            key={section}
            type="button"
            onClick={() => onSelect(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 + 0.05, type: 'spring', stiffness: 180, damping: 18 }}
            // Snappy slide right on hover — no scale, keeps it clean
            whileHover={{
              x: indentOffset + 14,
              transition: { type: 'spring', stiffness: 600, damping: 30 }
            }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center text-left focus:outline-none font-black"
            style={{
              fontFamily: '"Black Han Sans", sans-serif',
              fontSize: 'clamp(28px, 4.2vw, 50px)',
              lineHeight: 1.05,
              color: textColor,
              cursor: 'none',
              padding: '4px 18px 4px 10px',
              marginLeft: `${indentOffset}px`,
              zIndex: isActive ? 10 : 2,
              transform: 'skewX(-15deg)',
              textShadow: isActive
                ? 'none'
                : isHovered
                  ? '0 0 16px rgba(255,255,255,0.9), 0 0 32px rgba(0,229,255,0.6)'
                  : '0 0 10px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.2)',
              transition: 'color 0.1s, text-shadow 0.15s',
            }}
          >
            <AnimatePresence>

              {/* ── ACTIVE: pink line + white block (unchanged) ── */}
              {isActive && (
                <>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute h-[6px] -left-12 -right-8 z-[2] pointer-events-none"
                    style={{
                      background: '#ff0055',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      boxShadow: '0 0 12px #ff0055, 0 0 24px rgba(255,0,85,0.4)',
                    }}
                  />
                  <motion.div
                    layoutId="activeSlash"
                    initial={{ opacity: 0, scaleX: 0.3 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.3 }}
                    transition={{ type: 'spring', stiffness: 550, damping: 28 }}
                    className="absolute inset-y-0 -left-6 -right-6 z-[-1]"
                    style={{
                      background: '#ffffff',
                      borderLeft: '5px solid #00e5ff',
                      boxShadow: '6px 6px 0 rgba(0,0,0,0.85)',
                    }}
                  />
                </>
              )}

              {/* ── HOVER: slim cyan slash line on left + arrow — NO rectangle ── */}
              {!isActive && isHovered && (
                <>
                  {/* Left cyan border slash */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute inset-y-0 z-[-1] pointer-events-none"
                    style={{
                      left: -14,
                      width: 4,
                      background: '#00e5ff',
                      boxShadow: '0 0 10px #00e5ff, 0 0 20px rgba(0,229,255,0.5)',
                      transformOrigin: 'top',
                    }}
                  />
                  {/* Subtle glow band — very transparent, no rectangle feel */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.6 }}
                    transition={{ duration: 0.14 }}
                    className="absolute inset-y-0 z-[-1] pointer-events-none"
                    style={{
                      left: -14,
                      right: -8,
                      background: 'linear-gradient(90deg, rgba(0,229,255,0.12) 0%, transparent 70%)',
                      transformOrigin: 'left',
                    }}
                  />
                  {/* Animated arrow indicator */}
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      right: -20,
                      top: '50%',
                      transform: 'translateY(-50%) skewX(15deg)',
                      fontFamily: '"Black Han Sans",sans-serif',
                      fontSize: '0.45em',
                      color: '#00e5ff',
                      textShadow: '0 0 8px #00e5ff',
                    }}
                  >
                    ▶
                  </motion.span>
                </>
              )}

            </AnimatePresence>

            <span style={{ transform: 'skewX(15deg)' }}>{section}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
