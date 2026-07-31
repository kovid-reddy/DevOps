// ─────────────────────────────────────────────────────────────
//  PartyPanel.jsx  —  Right-side slide-out party members panel
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion'
import { PARTY_MEMBERS } from '../data/portfolioData'
import Icon from './Icon'

// HP bar — green
function HpBar({ value }) {
  return (
    <div>
      <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, letterSpacing:'1px', color:'rgba(255,255,255,0.5)', marginBottom:2 }}>HP</p>
      <div style={{ height:6, background:'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.15)', position:'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,#00ff88,#00cc44)', boxShadow:'0 0 6px rgba(0,255,136,0.5)' }}
        />
      </div>
    </div>
  )
}

// SP bar — blue
function SpBar({ value }) {
  return (
    <div style={{ marginTop: 3 }}>
      <p style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9, letterSpacing:'1px', color:'rgba(255,255,255,0.5)', marginBottom:2 }}>SP</p>
      <div style={{ height:6, background:'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.15)', position:'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,#4488ff,#0055ff)', boxShadow:'0 0 6px rgba(68,136,255,0.5)' }}
        />
      </div>
    </div>
  )
}

export default function PartyPanel({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-20"
            style={{ background: 'rgba(0,0,0,0.45)' }}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: 310, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 310, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-30 shadow-2xl"
            style={{
              width: 290,
              background: 'rgba(2, 9, 36, 0.98)',
              borderLeft: '4px solid #38bdf8',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.85)',
              backdropFilter: 'blur(24px)',
              padding: '80px 24px 24px',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 transition-colors"
              style={{
                background: 'black',
                border: '2px solid #00e5ff',
                color: '#00e5ff',
                padding: '6px 12px',
                transform: 'skewX(-10deg)',
                cursor: 'none',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ transform: 'skewX(10deg)' }}>
                <Icon name="close" size={18} />
              </div>
            </button>

            <h2 style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:34, color:'#ffffff', textShadow:'0 0 15px rgba(0,229,255,0.85)', marginBottom:24, letterSpacing:2 }}>
              <span style={{ color: '#00e5ff' }}>✦</span> PARTY
            </h2>

            {PARTY_MEMBERS.map(({ name, initial, hp, sp }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 20,
                  padding: 14,
                  background: 'rgba(0,229,255,0.05)',
                  border: '1.5px solid rgba(0,229,255,0.2)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
                }}
              >
                {/* Avatar Diamond */}
                <div style={{
                  width: 46, height: 46,
                  border: '2.5px solid #00e5ff',
                  background: 'black',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.8)',
                }}>
                  <span style={{ 
                    fontFamily: '"Black Han Sans",sans-serif', 
                    fontSize: 20, 
                    color: '#ffffff',
                    transform: 'rotate(-45deg)' // counter-rotate
                  }}>
                    {initial}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily:'"Black Han Sans",sans-serif', fontSize:13, letterSpacing:'1px', textTransform:'uppercase', color: 'white', marginBottom:6 }}>
                    {name}
                  </p>
                  <HpBar value={hp} />
                  <SpBar value={sp} />
                </div>
              </motion.div>
            ))}

            {/* Footer hint */}
            <p style={{ fontFamily:'"Rajdhani",sans-serif', fontSize:11, color:'rgba(255,255,255,0.4)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'auto', paddingTop:16 }}>
              Press P to toggle
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
