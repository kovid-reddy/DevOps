// ─────────────────────────────────────────────────────────────
//  App.jsx  —  Root component matching P3 Reload
//  Manages: active section, party HUD, layout transitions,
//           keyboard navigation, custom cursor, and back controls.
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NAME, SECTIONS, WALLET } from './data/portfolioData'
import BackgroundFX from './components/BackgroundFX'
import Menu from './components/Menu'
import Panel from './components/Panel'
import PartyPanel from './components/PartyPanel'

// ── Custom SVG silhouettes for P3 Reload Party Members ──────
function MakotoAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none select-none">
      <ellipse cx="50" cy="50" rx="35" ry="35" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3,6" />
      <g transform="translate(10, 10) scale(0.8)">
        {/* Hair Back */}
        <path d="M25 80 C 15 60, 10 30, 30 15 C 50 0, 75 10, 80 30 C 85 50, 70 75, 55 85" fill="#010618" stroke="#00e5ff" strokeWidth="1.5" />
        {/* Face skin */}
        <path d="M 40 40 Q 42 22, 58 20 Q 75 18, 70 38 Q 66 58, 55 60 Q 42 62, 40 40 Z" fill="#ffffff" />
        {/* Hair bangs */}
        <path d="M 28 20 C 35 15, 60 10, 68 25 C 75 35, 60 55, 50 65 C 45 55, 30 40, 28 20 Z" fill="#00d2ff" />
        <path d="M 40 12 C 45 10, 65 15, 62 32 C 58 40, 52 48, 48 55" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        {/* White Headphone around neck */}
        <ellipse cx="38" cy="62" rx="6" ry="10" fill="#ffffff" stroke="#00e5ff" strokeWidth="1.5" transform="rotate(15 38 62)" />
        <ellipse cx="38" cy="62" rx="3" ry="5" fill="#010618" stroke="#00e5ff" strokeWidth="1" transform="rotate(15 38 62)" />
        {/* Eye */}
        <ellipse cx="56" cy="35" rx="2" ry="4" fill="#00e5ff" />
      </g>
    </svg>
  )
}

function YukariAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none select-none">
      <ellipse cx="50" cy="50" rx="35" ry="35" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3,6" />
      <g transform="translate(10, 10) scale(0.8)">
        {/* Hair Back */}
        <path d="M 25 75 C 10 60, 15 25, 35 15 C 55 5, 80 15, 80 35 C 80 55, 75 70, 55 80" fill="#010618" stroke="#00e5ff" strokeWidth="1.5" />
        {/* Face skin */}
        <path d="M 42 42 Q 44 24, 60 22 Q 74 20, 72 38 Q 70 52, 60 56 Q 48 60, 42 42 Z" fill="#ffffff" />
        {/* Sleek bob hair */}
        <path d="M 28 22 C 34 14, 68 8, 74 24 C 80 34, 76 56, 70 65 C 65 52, 62 48, 55 45 C 48 42, 32 35, 28 22 Z" fill="#00d2ff" />
        {/* Ribbon collar */}
        <path d="M 46 64 L 56 68 L 50 78 Z" fill="#ff0055" stroke="#ffffff" strokeWidth="1" />
        {/* Eye */}
        <ellipse cx="58" cy="34" rx="2.5" ry="4" fill="#00e5ff" />
      </g>
    </svg>
  )
}

function JunpeiAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none select-none">
      <ellipse cx="50" cy="50" rx="35" ry="35" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3,6" />
      <g transform="translate(10, 10) scale(0.8)">
        {/* Hair & Cap Back */}
        <path d="M 22 70 C 15 50, 15 28, 30 18 C 45 8, 70 10, 78 26 C 84 38, 78 68, 65 78" fill="#010618" stroke="#00e5ff" strokeWidth="1.5" />
        {/* Face skin */}
        <path d="M 40 40 Q 42 22, 58 20 Q 75 18, 70 42 Q 65 58, 54 62 Q 44 64, 40 40 Z" fill="#ffffff" />
        {/* Cap visor pointing right */}
        <path d="M 32 20 C 35 10, 68 8, 76 16 L 86 28 L 68 28 Z" fill="#00d2ff" stroke="#ffffff" strokeWidth="1.5" />
        {/* Cap band */}
        <rect x="36" y="24" width="30" height="6" fill="#010618" rx="2" stroke="#00e5ff" strokeWidth="1" />
        {/* Goatee chin strap */}
        <path d="M 45 62 Q 52 68, 56 66 L 54 74 Z" fill="#010618" />
        {/* Eye */}
        <ellipse cx="56" cy="38" rx="2" ry="3" fill="#00e5ff" />
      </g>
    </svg>
  )
}

export default function App() {
  const [activeIdx, setActiveIdx]   = useState(null)
  const [partyOpen, setPartyOpen]   = useState(false)
  const [mousePos, setMousePos]     = useState({ x: 0, y: 0 })

  // Spring-smoothed cursor position (ultra stiffness for instant tracking)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 1200, damping: 45 })
  const springY = useSpring(cursorY, { stiffness: 1200, damping: 45 })

  // Avatar zone parallax
  const avatarX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const avatarY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })

  // ── Mouse tracking ──────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      avatarX.set(cx * 12)
      avatarY.set(cy * 7)
      setMousePos({ x: cx * 100, y: cy * 100 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [cursorX, cursorY, avatarX, avatarY])

  // ── Select section ──────────────────────────────────────────
  const selectSection = useCallback((idx) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)
  }, [activeIdx])

  // ── Close / Back helper ────────────────────────────────────
  const closeSection = useCallback(() => {
    setActiveIdx(null)
  }, [])

  // ── Keyboard navigation ─────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectSection(activeIdx === null ? 0 : (activeIdx + 1) % SECTIONS.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectSection(activeIdx === null ? 0 : (activeIdx - 1 + SECTIONS.length) % SECTIONS.length)
      } else if (e.key.toLowerCase() === 'p') {
        setPartyOpen(v => !v)
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault()
        closeSection()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIdx, selectSection, closeSection])

  const activeSectionName = activeIdx !== null ? SECTIONS[activeIdx] : null

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#010618]">

      {/* ── Custom cursor (Cyan Diamond style) ──────────────── */}
      <motion.div
        className="custom-cursor hidden md:block"
        style={{ x: springX, y: springY, pointerEvents: 'none' }}
      >
        <div style={{ 
          width: 22, 
          height: 22, 
          border: '2.5px solid #00e5ff', 
          background: 'rgba(0,229,255,0.25)',
          transform: 'translate(-50%,-50%) rotate(45deg) skew(8deg, 8deg)',
          boxShadow: '0 0 14px rgba(0,229,255,0.7)'
        }} />
      </motion.div>
      <motion.div
        className="custom-cursor hidden md:block"
        style={{ x: cursorX, y: cursorY, pointerEvents: 'none' }}
      >
        <div style={{ 
          width: 6, 
          height: 6, 
          background: '#ffffff', 
          border: '1.5px solid #010618',
          transform: 'translate(-50%,-50%) rotate(45deg)',
        }} />
      </motion.div>

      {/* ── Background layers ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <BackgroundFX mouseX={mousePos.x} mouseY={mousePos.y} />
      </div>

      {/* ── Navigation bar (P3 Reload top-left white wallet) ── */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-5 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          style={{
            background: 'white',
            color: 'black',
            padding: '8px 24px',
            boxShadow: '4px 4px 0 rgba(1, 6, 24, 0.9)',
            border: '2.5px solid #010618',
            transform: 'skewX(-8deg)',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ transform: 'skewX(8deg)' }}>
            {/* Wallet label cosmetic */}
            <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:26, lineHeight:1, color: 'black' }}>{WALLET}</p>
            <p style={{ fontFamily:'"Rajdhani",sans-serif', fontWeight:700, fontSize:10, letterSpacing:'2px', opacity:0.6, textTransform:'uppercase', color: 'black' }}>current wallet</p>
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setPartyOpen(v => !v)}
          whileHover={{ 
            boxShadow: '0 0 20px rgba(0,229,255,0.7)', 
            borderColor: '#00e5ff', 
            background: '#00e5ff', 
            color: '#000000',
            transform: 'skewX(-10deg) scale(1.05)'
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          style={{
            background: 'rgba(1, 6, 24, 0.75)',
            border: '2px solid #38bdf8',
            padding: '10px 22px',
            color: '#38bdf8',
            fontFamily: '"Black Han Sans",sans-serif',
            letterSpacing: '2px',
            fontSize: 14,
            backdropFilter: 'blur(10px)',
            transform: 'skewX(-10deg)',
            textTransform: 'uppercase',
            cursor: 'none',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.85)',
            pointerEvents: 'auto',
          }}
        >
          ◈ PARTY
        </motion.button>
      </nav>

      {/* ── Main Dynamic Layout transitions between Menu and Details ── */}
      <div className="absolute inset-0 z-5 flex items-center justify-center pt-24 pb-8 px-6 md:px-12 md:overflow-hidden overflow-y-auto">
        <div className="relative w-full h-full flex items-center justify-between">

          {/* 1. Left — Avatar Zone (Slides off-screen on Selection) */}
          <motion.div
            className="absolute left-0 w-[27%] hidden md:flex items-center justify-center h-full"
            animate={{ 
              x: activeIdx === null ? 0 : -380, 
              opacity: activeIdx === null ? 1 : 0 
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          >
            <motion.div style={{ x: avatarX, y: avatarY }} className="relative">
              {/* Frame borders */}
              <div style={{ position:'absolute', inset:0, width:260, height:380, border:'3px solid #00e5ff', background: 'rgba(2,9,36,0.92)', transform:'rotate(-3deg)', boxShadow: '6px 6px 0 #010618' }} />
              <div style={{ position:'absolute', inset:10, width:240, height:360, border:'2px dashed rgba(0,229,255,0.3)', transform:'rotate(2deg)' }} />

              {/* avatar borders */}
              <div style={{ position:'relative', width:260, height:380, display:'flex', alignItems:'center', justifyContent:'center' }}>

                {/* Tag pill at top */}
                <div style={{
                  position:'absolute', top:-16, left:'50%', transform:'translateX(-50%) skewX(-15deg)',
                  background:'#00e5ff', color:'black',
                  fontFamily:'"Black Han Sans",sans-serif', fontSize:12, letterSpacing:3,
                  padding:'4px 20px', whiteSpace:'nowrap',
                  border: '1.5px solid white',
                  boxShadow: '3px 3px 0 #010618',
                }}>
                  <div style={{ transform: 'skewX(15deg)' }}>{NAME.tag}</div>
                </div>

                {/* Giant initial letter */}
                <motion.span
                  animate={{ textShadow: [
                    '0 0 20px rgba(0,229,255,0.8), 0 0 40px rgba(0,229,255,0.3)',
                    '0 0 40px rgba(0,229,255,0.95), 0 0 80px rgba(0,229,255,0.5)',
                    '0 0 20px rgba(0,229,255,0.8), 0 0 40px rgba(0,229,255,0.3)',
                  ]}}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    fontFamily: '"Black Han Sans",sans-serif',
                    fontSize: 190,
                    color: '#ffffff',
                    lineHeight: 1,
                    userSelect: 'none',
                    WebkitTextStroke: '2.5px #00e5ff',
                  }}
                >
                  {NAME.initial}
                </motion.span>

                {/* Circle accent */}
                <div style={{
                  position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%) rotate(45deg)',
                  width:70, height:70,
                  border:'3px solid #00e5ff',
                  background:'rgba(0,229,255,0.1)',
                  boxShadow:'0 0 20px rgba(0,229,255,0.4)',
                }} />

                {/* Stylized nameplate */}
                <div style={{
                  position: 'absolute',
                  top: '45%',
                  left: '-15px',
                  right: '-15px',
                  transform: 'translateY(-50%) rotate(-6deg)',
                  zIndex: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                  pointerEvents: 'none',
                }}>
                  {/* Banner 1 */}
                  <div style={{
                    background: 'black',
                    color: 'white',
                    padding: '6px 24px',
                    fontFamily: '"Black Han Sans", sans-serif',
                    fontSize: 34,
                    letterSpacing: '2px',
                    transform: 'skewX(-12deg)',
                    boxShadow: '-5px 5px 0 #00e5ff',
                    border: '2px solid white',
                    lineHeight: 1.1,
                    display: 'inline-block',
                  }}>
                    {NAME.first}
                  </div>
                  {/* Banner 2 */}
                  <div style={{
                    background: '#00e5ff',
                    color: 'black',
                    padding: '5px 20px',
                    fontFamily: '"Black Han Sans", sans-serif',
                    fontSize: 26,
                    letterSpacing: '2px',
                    transform: 'skewX(-8deg) translateX(12px)',
                    boxShadow: '-4px 4px 0 black',
                    border: '2px solid white',
                    lineHeight: 1.1,
                    display: 'inline-block',
                  }}>
                    {NAME.last}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Middle — Staircase Menu (Shifts Left on selection) */}
          <motion.div
            className="absolute flex flex-col justify-center h-full z-10 w-full md:w-[35%]"
            animate={{ 
              left: activeIdx === null ? '31%' : '1%' 
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            {/* Active section title card */}
            {activeIdx !== null ? (
              <div className="relative inline-block mb-6 align-self-start self-start z-10">
                {/* Cyan Backdrop Skew */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#00e5ff',
                  transform: 'skewX(-12deg) translate(4px, 4px)',
                  zIndex: -1,
                }} />
                {/* Main Skew Block */}
                <motion.div
                  layout
                  className="inline-block"
                  style={{
                    background: 'white',
                    color: 'black',
                    padding: '6px 32px',
                    transform: 'skewX(-12deg)',
                    border: '2.5px solid black',
                  }}
                >
                  <motion.span
                    key={activeSectionName}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      fontFamily: '"Black Han Sans",sans-serif',
                      fontSize: 'clamp(28px,4vw,40px)',
                      display: 'block',
                      transform: 'skewX(12deg)', // counter-skew
                      letterSpacing: '2px',
                      color: 'black',
                    }}
                  >
                    {activeSectionName}
                  </motion.span>
                </motion.div>
              </div>
            ) : (
              <div style={{ height: 60 }} />
            )}

            {/* Menu list */}
            <div className="mb-4">
              <Menu
                sections={SECTIONS}
                activeIdx={activeIdx}
                onSelect={selectSection}
              />
            </div>
          </motion.div>

          {/* 3. Right — Details Panel & Party HUD Container */}
          <div className="absolute right-0 w-full md:w-[48%] h-full flex flex-col justify-center select-none">
            
            {/* 3.1 Party HUD (Shows when Idle, slides off to right) */}
            <AnimatePresence>
              {activeIdx === null && (
                <motion.div 
                  initial={{ x: 350, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 350, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  className="absolute right-0 flex flex-col gap-5 select-none pointer-events-none w-full md:max-w-[360px]"
                >
                  {/* Makoto Yuki Card */}
                  <div className="flex items-center gap-4 bg-[#020924]/85 border-r-[4px] border-[#00e5ff] p-3 pr-5 shadow-2xl skew-card border-[1.5px] border-rgba(0,229,255,0.25)">
                    <div className="skew-card-inner flex items-center gap-4 w-full">
                      <MakotoAvatar />
                      <div className="flex-1">
                        <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:14, color: 'white', letterSpacing: '1px', textTransform:'uppercase', lineHeight:1, marginBottom: 6 }}>
                          MAKOTO (KOVID)
                        </p>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>HP 92/92</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#00ff88]" style={{ width: '92%' }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>SP 78/78</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#4488ff]" style={{ width: '78%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Yukari Card */}
                  <div className="flex items-center gap-4 bg-[#020924]/85 border-r-[4px] border-[#00e5ff] p-3 pr-5 shadow-2xl skew-card border-[1.5px] border-rgba(0,229,255,0.25)">
                    <div className="skew-card-inner flex items-center gap-4 w-full">
                      <YukariAvatar />
                      <div className="flex-1">
                        <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:14, color: 'white', letterSpacing: '1px', textTransform:'uppercase', lineHeight:1, marginBottom: 6 }}>
                          YUKARI (DESIGN)
                        </p>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>HP 76/76</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#00ff88]" style={{ width: '76%' }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>SP 85/85</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#4488ff]" style={{ width: '85%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Junpei Card */}
                  <div className="flex items-center gap-4 bg-[#020924]/85 border-r-[4px] border-[#00e5ff] p-3 pr-5 shadow-2xl skew-card border-[1.5px] border-rgba(0,229,255,0.25)">
                    <div className="skew-card-inner flex items-center gap-4 w-full">
                      <JunpeiAvatar />
                      <div className="flex-1">
                        <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:14, color: 'white', letterSpacing: '1px', textTransform:'uppercase', lineHeight:1, marginBottom: 6 }}>
                          JUNPEI (SECURITY)
                        </p>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>HP 68/68</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#00ff88]" style={{ width: '68%' }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, color:'#ffd600', marginBottom:2 }}>SP 90/90</p>
                            <div className="h-[5px] bg-black/80 border-[0.5px] border-white/20 relative">
                              <div className="absolute inset-y-0 left-0 bg-[#4488ff]" style={{ width: '90%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* 3.2 Details Panel (Slides in from Right on selection) */}
            <AnimatePresence>
              {activeIdx !== null && (
                <motion.div
                  initial={{ x: 450, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 450, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 25 }}
                  className="absolute right-0 w-full z-5"
                >
                  <Panel activeSection={activeSectionName} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* ── Permanent Bottom-Right RPG HUD pill ──────────────── */}
      <div 
        className="absolute bottom-6 right-8 z-10 flex items-center gap-4 select-none"
        style={{ fontFamily: '"Rajdhani",sans-serif', fontSize: 13, letterSpacing: '1px', fontWeight: 700 }}
      >
        {/* Help label */}
        {activeIdx === null ? (
          <div className="hidden md:flex items-center gap-1.5 text-white/40 uppercase">
            <span>Use a Section</span>
            <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.08)', padding: '1px 5px', border: '1px solid rgba(255,255,255,0.15)' }}>Command</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 text-white/40 uppercase">
            <span>Viewing Details</span>
            <span style={{ fontSize: 10, background: 'rgba(0,229,255,0.1)', color: '#00e5ff', padding: '1px 5px', border: '1px solid rgba(0,229,255,0.3)' }}>Inspect</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2.5">
          {/* A Confirm button */}
          <div style={{
            background: 'white',
            color: 'black',
            padding: '6px 16px',
            transform: 'skewX(-10deg)',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.8)',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <div style={{ transform: 'skewX(10deg)', display: 'flex', alignItems:'center', gap:4 }}>
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">A</span>
              <span className="text-[12px] font-black uppercase">Confirm</span>
            </div>
          </div>

          {/* B Close button (Interactive to go back!) */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeSection}
            style={{
              background: '#010618',
              color: '#00e5ff',
              padding: '6px 16px',
              transform: 'skewX(-10deg)',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.8)',
              border: '2px solid #00e5ff',
              cursor: activeIdx !== null ? 'none' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: activeIdx !== null ? 1 : 0.4,
              pointerEvents: activeIdx !== null ? 'auto' : 'none'
            }}
          >
            <div style={{ transform: 'skewX(10deg)', display: 'flex', alignItems:'center', gap:4 }}>
              <span className="w-4 h-4 rounded-full bg-[#00e5ff] text-black text-[10px] flex items-center justify-center font-black">B</span>
              <span className="text-[12px] font-black uppercase">Close</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Party panel ──────────────────────────────────────── */}
      <PartyPanel isOpen={partyOpen} onClose={() => setPartyOpen(false)} />

      {/* ── Keyboard hints (bottom center) ───────────────────── */}
      <div
        className="absolute bottom-4 left-1/2 z-10 flex gap-5 hidden md:flex"
        style={{ transform: 'translateX(-50%)', fontFamily:'"Rajdhani",sans-serif', fontSize:11, color:'rgba(255,255,255,0.3)', letterSpacing:'1px', textTransform:'uppercase' }}
      >
        {[['↑ ↓', 'Navigate'], ['Enter', 'Select'], ['Esc / Backspace', 'Close'], ['P', 'Party']].map(([key, label]) => (
          <span key={key}>
            <span style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', padding:'2px 7px', fontFamily:'"Share Tech Mono",monospace', fontSize:10, color:'rgba(255,255,255,0.5)' }}>
              {key}
            </span>
            {' '}{label}
          </span>
        ))}
      </div>

    </div>
  )
}
