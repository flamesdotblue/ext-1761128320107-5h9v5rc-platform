import React from 'react'
import { motion } from 'framer-motion'

export default function HomeScreen({ notes, onOpen }) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between px-2">
        <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-lg font-semibold text-transparent">All Notes</h2>
        <p className="text-xs text-slate-500">{notes.length} items</p>
      </div>
      <div className="grid grid-cols-1 gap-3 p-1 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => (
          <Card key={n.id} note={n} onClick={() => onOpen(n)} />
        ))}
      </div>
    </div>
  )
}

function Card({ note, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-4 text-left shadow-[0_15px_40px_-20px_rgba(31,41,55,0.35)] backdrop-blur-2xl"
    >
      <div className={`pointer-events-none absolute -inset-0.5 rounded-[26px] bg-gradient-to-br ${note.color}`} />
      <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="line-clamp-1 text-[15px] font-semibold tracking-tight text-slate-800">{note.title}</h3>
          <span className="ml-2 inline-flex items-center rounded-full border border-white/60 bg-white/60 px-2 py-0.5 text-[10px] text-slate-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]">{note.updatedAt}</span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-600/90">{note.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[0,1,2].map((i) => (
              <span key={i} className="relative inline-flex size-6 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[10px] text-slate-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95)]">{String.fromCharCode(65+i)}</span>
            ))}
          </div>
          <span className="inline-flex items-center rounded-xl border border-white/70 bg-white/70 px-2 py-1 text-[10px] text-slate-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] transition-colors group-hover:bg-white/80">Open</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(200px_80px_at_30%_20%,rgba(255,255,255,0.6),transparent)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/50" />
      <div className="pointer-events-none absolute -inset-px rounded-[26px] shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_25px_60px_-30px_rgba(59,130,246,0.35)]" />
    </motion.button>
  )
}
