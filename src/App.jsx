import React, { useMemo, useState, useEffect } from 'react'
import { Home, FileText, Settings, User } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import HomeScreen from './components/HomeScreen'
import NoteScreen from './components/NoteScreen'
import SettingsScreen from './components/SettingsScreen'
import ProfileScreen from './components/ProfileScreen'

const TABS = {
  home: 'home',
  note: 'note',
  settings: 'settings',
  profile: 'profile',
}

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.home)
  const [selectedNote, setSelectedNote] = useState(null)

  const notes = useMemo(
    () => [
      {
        id: 'n1',
        title: 'Vision Design Notes',
        excerpt: 'Glass depth, reflective gradients, and motion parallax... ',
        color: 'from-sky-300/40 via-cyan-200/30 to-blue-200/20',
        updatedAt: '2m ago',
      },
      {
        id: 'n2',
        title: 'Roadmap — Q4',
        excerpt: 'Milestones, performance budgets, micro-interactions...',
        color: 'from-emerald-300/40 via-teal-200/30 to-cyan-200/20',
        updatedAt: '1h ago',
      },
      {
        id: 'n3',
        title: 'Writing — Serenity',
        excerpt: 'A calm, glasslike morning. Light slips across metal...',
        color: 'from-indigo-300/40 via-violet-200/30 to-fuchsia-200/20',
        updatedAt: 'Yesterday',
      },
      {
        id: 'n4',
        title: 'Ideas',
        excerpt: 'Haptic glints, dynamic blur, spectral shimmer...',
        color: 'from-slate-300/40 via-zinc-200/30 to-sky-200/20',
        updatedAt: 'This week',
      },
    ],
    []
  )

  const onOpenNote = (note) => {
    setSelectedNote(note)
    setActiveTab(TABS.note)
  }

  // Motion parallax background
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handle = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth) * 2 - 1) // -1..1
      mouseY.set((e.clientY / innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', handle)
    return () => window.removeEventListener('pointermove', handle)
  }, [mouseX, mouseY])

  const parallax1X = useTransform(mouseX, [ -1, 1 ], [ 18, -18 ])
  const parallax1Y = useTransform(mouseY, [ -1, 1 ], [ 18, -18 ])
  const parallax2X = useTransform(mouseX, [ -1, 1 ], [ -10, 10 ])
  const parallax2Y = useTransform(mouseY, [ -1, 1 ], [ -10, 10 ])
  const parallax3X = useTransform(mouseX, [ -1, 1 ], [ 6, -6 ])
  const parallax3Y = useTransform(mouseY, [ -1, 1 ], [ 6, -6 ])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_800px_at_50%_-10%,#e5f0ff_0%,#e9f1ff_10%,#eef3ff_25%,#f6f8ff_50%,#fafcff_70%,#ffffff_100%)] text-slate-900 selection:bg-sky-200/60">
      {/* Ambient parallax glass light fields */}
      <motion.div
        style={{ x: parallax1X, y: parallax1Y }}
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[conic-gradient(from_210deg,rgba(145,206,255,0.5),rgba(255,255,255,0.25),rgba(180,228,255,0.45))] blur-3xl opacity-70"
      />
      <motion.div
        style={{ x: parallax2X, y: parallax2Y }}
        className="pointer-events-none absolute -bottom-32 -right-36 h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(120,170,255,0.45),rgba(255,255,255,0.12),transparent_70%)] blur-3xl"
      />
      <motion.div
        style={{ x: parallax3X, y: parallax3Y }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(160,210,255,0.35),rgba(255,255,255,0.08),transparent_60%)] blur-3xl opacity-80"
      />

      {/* Specular sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="h-full w-[40%] skew-x-12 bg-gradient-to-r from-white/0 via-white/15 to-white/0"
        />
      </div>

      {/* App chrome */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col p-4 md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative size-10 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-200/60 via-white/30 to-blue-200/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_10px_25px_-10px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(120px_60px_at_30%_20%,rgba(255,255,255,0.9),transparent)]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-800">Glass Notes</h1>
              <p className="text-xs text-slate-500">Calm, futuristic, precise</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-2xl border border-white/30 bg-white/30 px-3 py-2 text-xs text-slate-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur-xl md:flex">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            Vision UI Ready
          </div>
        </header>

        <main className="relative flex-1">
          <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-b from-white/40 to-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]" />
          <div className="relative rounded-[28px] border border-white/30 bg-white/30 p-2 shadow-[0_10px_40px_-10px_rgba(31,41,55,0.25)] backdrop-blur-2xl">
            <div className="rounded-[22px] border border-white/40 bg-gradient-to-br from-white/60 via-white/20 to-white/10 p-3">
              <AnimatePresence mode="wait">
                {activeTab === TABS.home && (
                  <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <HomeScreen notes={notes} onOpen={onOpenNote} />
                  </motion.div>
                )}
                {activeTab === TABS.note && (
                  <motion.div key="note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <NoteScreen note={selectedNote} onBack={() => setActiveTab(TABS.home)} />
                  </motion.div>
                )}
                {activeTab === TABS.settings && (
                  <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <SettingsScreen />
                  </motion.div>
                )}
                {activeTab === TABS.profile && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <ProfileScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Glass Dock */}
        <nav className="sticky bottom-4 mt-6 self-center rounded-3xl border border-white/30 bg-white/30 px-2 py-1.5 shadow-[0_10px_30px_-10px_rgba(31,41,55,0.25),inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-2xl">
          <ul className="flex items-center gap-1">
            <DockButton icon={<Home size={18} />} label="Home" active={activeTab === TABS.home} onClick={() => setActiveTab(TABS.home)} />
            <DockButton icon={<FileText size={18} />} label="Note" active={activeTab === TABS.note} onClick={() => setActiveTab(TABS.note)} />
            <DockButton icon={<Settings size={18} />} label="Settings" active={activeTab === TABS.settings} onClick={() => setActiveTab(TABS.settings)} />
            <DockButton icon={<User size={18} />} label="Profile" active={activeTab === TABS.profile} onClick={() => setActiveTab(TABS.profile)} />
          </ul>
        </nav>
      </div>

      {/* Film grain subtle */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cfilter id=\'n%27%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.6\'/%3E%3C/svg%3E")' }} />
    </div>
  )
}

function DockButton({ icon, label, active, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`group relative flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-all duration-300 ${
          active
            ? 'bg-white/60 text-slate-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_6px_18px_-8px_rgba(0,0,0,0.25)]'
            : 'text-slate-700 hover:bg-white/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),0_6px_18px_-10px_rgba(0,0,0,0.2)]'
        } backdrop-blur-xl border border-white/50`}
      >
        <span
          className={`relative inline-flex size-7 items-center justify-center rounded-xl border ${
            active ? 'border-white/70 bg-white/70' : 'border-white/60 bg-white/40'
          } shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]`}
        >
          <span className={`text-slate-800 opacity-80 ${active ? '' : 'group-hover:opacity-100'}`}>{icon}</span>
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-transparent" />
        </span>
        <span className="hidden pr-1 text-xs text-slate-800 sm:inline">{label}</span>
      </button>
    </li>
  )
}
