// ─────────────────────────────────────────────────────────────
//  Panel.jsx  —  Content area that swaps per active section
//  Uses AnimatePresence for enter/exit transitions
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ABOUT, ABOUT_HIGHLIGHTS, CALENDAR, DEPLOY_NOTES,
  PROJECTS, QUESTS, SKILLS, SOCIALS, STATS, SYSTEM_INFO,
} from '../data/portfolioData'
import Icon from './Icon'

// ── Panel enter/exit animation variants (smooth horizontal slide) ──
const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -30 },
}

// ── Stat bars need a mount trigger ───────────────────────────
function StatBars() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  return (
    <div className="flex flex-col gap-3">
      {STATS.map(({ name, value }) => (
        <div key={name} className="flex items-center gap-4">
          <span
            className="shrink-0 uppercase tracking-widest"
            style={{ fontFamily: '"Rajdhani",sans-serif', fontWeight: 700, fontSize: 12, color: '#ffffff', width: 110 }}
          >
            {name}
          </span>
          <div className="flex-1 h-2.5 relative" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div
              className="absolute inset-y-0 left-0 stat-bar-fill"
              style={{
                width: mounted ? `${value}%` : '0%',
                background: 'linear-gradient(90deg, #020b5c, #0614a8, #00e5ff)',
                boxShadow: '0 0 8px rgba(0,229,255,0.6)',
              }}
            />
          </div>
          <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 13, color: '#00e5ff', width: 28, textAlign: 'right', fontWeight: 700 }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Highlight keywords in about text ─────────────────────────
function HighlightText({ text }) {
  let result = text
  ABOUT_HIGHLIGHTS.forEach(kw => {
    result = result.split(kw).join(`<em>${kw}</em>`)
  })
  return (
    <p
      className="leading-relaxed"
      style={{ fontFamily: '"Rajdhani",sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}
      dangerouslySetInnerHTML={{
        __html: result
          .replace(/\n\n/g, '<br/><br/>')
          .replace(/<em>/g, '<em style="color:#00e5ff;font-style:normal;font-weight:700">')
      }}
    />
  )
}

// ── Individual section panels ─────────────────────────────────

function SkillPanel() {
  return (
    <div className="flex flex-col gap-4">
      {SKILLS.map(({ group, items }) => (
        <div key={group}>
          <p style={{ fontFamily:'"Rajdhani",sans-serif', fontWeight:700, fontSize:12, letterSpacing:'3px', color:'#00e5ff', textTransform:'uppercase', marginBottom:8 }}>
            {group}
          </p>
          <div className="flex flex-wrap gap-2">
            {items.map(skill => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.08, background: '#00e5ff', color: '#000000', borderColor: '#ffffff', boxShadow: '0 0 12px rgba(0,229,255,0.5)' }}
                style={{
                  background: 'rgba(0,229,255,0.06)',
                  border: '1.5px solid rgba(0,229,255,0.4)',
                  padding: '4px 12px',
                  fontFamily: '"Rajdhani",sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#ffffff',
                  cursor: 'none',
                  transition: 'background 0.12s, border-color 0.12s, color 0.12s',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ItemPanel() {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
      {PROJECTS.map(({ title, tag, desc, link }) => (
        <motion.a
          key={title}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ 
            y: -6, 
            rotate: 1.8, 
            scale: 1.04, 
            borderColor: '#00e5ff', 
            background: 'rgba(0,229,255,0.08)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)' 
          }}
          transition={{ duration: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.1)',
            padding: 16,
            textDecoration: 'none',
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'none',
          }}
        >
          <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,#00e5ff,rgba(0,229,255,0))' }} />
          <p style={{ fontSize:11, letterSpacing:2, color:'#00e5ff', fontFamily:'"Black Han Sans",sans-serif', textTransform:'uppercase', marginBottom:5 }}>{tag}</p>
          <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:16, color:'white', marginBottom:6, lineHeight:1.25 }}>{title}</p>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.7)', fontFamily:'"Rajdhani",sans-serif', lineHeight:1.5 }}>{desc}</p>
        </motion.a>
      ))}
    </div>
  )
}

function PersonaPanel() {
  return <HighlightText text={ABOUT} />
}

function QuestPanel() {
  return (
    <div className="flex flex-col gap-1">
      {QUESTS.map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3.5"
          style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 6px #00e5ff', '0 0 14px #00e5ff', '0 0 6px #00e5ff'] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            style={{ width:10, height:10, background:'#00e5ff', transform:'rotate(45deg)', flexShrink:0, marginTop:5 }}
          />
          <p style={{ fontFamily:'"Rajdhani",sans-serif', fontSize:15, color:'rgba(255,255,255,0.9)', fontWeight:600 }}>{q}</p>
        </motion.div>
      ))}
    </div>
  )
}

function SocialPanel() {
  return (
    <div className="flex flex-col gap-3">
      {SOCIALS.map(({ label, href, icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 12, background: '#00e5ff', color: '#000000', borderColor: '#ffffff', boxShadow: '0 0 20px rgba(0,229,255,0.5)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-3.5 w-full text-left"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.1)',
            padding: '14px 20px',
            color: 'white',
            textDecoration: 'none',
            fontFamily: '"Black Han Sans",sans-serif',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'none',
          }}
        >
          <Icon name={icon} size={20} />
          {label}
          <Icon name="arrow" size={16} style={{ marginLeft: 'auto', opacity: 0.6 }} />
        </motion.a>
      ))}
    </div>
  )
}

function CalendarPanel() {
  return (
    <div className="flex flex-col gap-3.5">
      {CALENDAR.map(({ label, desc }) => (
        <div
          key={label}
          style={{ display:'flex', alignItems:'flex-start', gap:14, padding:12, borderLeft:'4px solid #00e5ff', background:'rgba(0,229,255,0.04)' }}
        >
          <div style={{ width:8, height:8, background:'#00e5ff', transform: 'rotate(45deg)', flexShrink:0, marginTop:6 }} />
          <div>
            <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:14, letterSpacing:1.5, textTransform:'uppercase', color:'#00e5ff', marginBottom:4 }}>{label}</p>
            <p style={{ fontFamily:'"Rajdhani",sans-serif', fontSize:14, color:'rgba(255,255,255,0.8)', fontWeight:500 }}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SystemPanel() {
  return (
    <div>
      {SYSTEM_INFO.map(({ key, value }) => (
        <div key={key} className="flex justify-between items-center" style={{ padding:'10px 0', borderBottom:'1px solid rgba(0,229,255,0.15)' }}>
          <span style={{ fontFamily:'"Rajdhani",sans-serif', fontWeight:700, fontSize:12, letterSpacing:'2px', color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>{key}</span>
          <span style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:13, color:'#00e5ff', fontWeight:700 }}>{value}</span>
        </div>
      ))}
      <pre style={{
        marginTop: 16,
        background: 'rgba(0,0,0,0.65)',
        border: '1.5px solid #00e5ff',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.8)',
        padding: '12px 16px',
        fontFamily: '"Share Tech Mono",monospace',
        fontSize: 11.5,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.9,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {DEPLOY_NOTES}
      </pre>
    </div>
  )
}

// ── Section → component map ───────────────────────────────────
const PANEL_MAP = {
  'SKILL':       <SkillPanel />,
  'ITEM':        <ItemPanel />,
  'PERSONA':     <PersonaPanel />,
  'STATS':       <StatBars />,
  'QUEST':       <QuestPanel />,
  'SOCIAL LINK': <SocialPanel />,
  'CALENDAR':    <CalendarPanel />,
  'SYSTEM':      <SystemPanel />,
}

// ── Main Panel export ─────────────────────────────────────────
export default function Panel({ activeSection }) {
  const scrollRef = useRef(null)

  // Reset scroll on section change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [activeSection])

  return (
    <div
      ref={scrollRef}
      className="persona-scroll shrink-0"
      style={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 180px)',
        background: 'rgba(2, 9, 36, 0.95)',
        border: '2px solid #38bdf8',
        boxShadow: '6px 6px 0 rgba(1, 6, 24, 0.95)',
        backdropFilter: 'blur(24px)',
        padding: '20px 24px',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {activeSection && PANEL_MAP[activeSection] ? (
            PANEL_MAP[activeSection]
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <motion.span 
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontFamily: '"Black Han Sans",sans-serif', fontSize: 36, color: '#00e5ff', display: 'block', marginBottom: 12, textShadow: '0 0 10px rgba(0,229,255,0.5)' }}
              >
                ◈
              </motion.span>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily:'"Rajdhani",sans-serif', fontSize: 13, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
                SELECT A SECTION TO INITIATE
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
