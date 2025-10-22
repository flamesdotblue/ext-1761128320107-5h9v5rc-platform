import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bold, Italic, List, Check, PenLine } from 'lucide-react'

export default function NoteScreen({ note, onBack }) {
  const [content, setContent] = useState(
    (note?.title ? `# ${note.title}\n\n` : '') +
      (note?.excerpt || 'Write your thoughts with glasslike clarity...')
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="rounded-2xl border border-white/60 bg-white/60 px-3 py-1.5 text-xs text-slate-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:bg-white/80">Back</button>
          <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-lg font-semibold text-transparent">{note?.title || 'New Note'}</h2>
        </div>
        <div className="flex items-center gap-1 rounded-2xl border border-white/40 bg-white/40 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]">
          <ToolButton icon={<PenLine size={16} />} label="Pen" />
          <ToolButton icon={<Bold size={16} />} label="Bold" />
          <ToolButton icon={<Italic size={16} />} label="Italic" />
          <ToolButton icon={<List size={16} />} label="List" />
          <ToolButton icon={<Check size={16} />} label="Task" glow />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-1 shadow-[0_20px_60px_-30px_rgba(31,41,55,0.35)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_120px_at_20%_0%,rgba(255,255,255,0.9),transparent)]" />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/60" />
        <motion.textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          spellCheck={false}
          className="relative w-full resize-none rounded-[22px] border border-white/60 bg-gradient-to-br from-white/70 via-white/40 to-white/30 p-5 font-light leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span>iCloud · Saved just now</span>
        <span>Words: {content.trim().split(/\s+/).filter(Boolean).length}</span>
      </div>
    </div>
  )
}

function ToolButton({ icon, label, glow }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-xs text-slate-800 transition-colors ${
        glow
          ? 'border-white/70 bg-white/70 shadow-[0_10px_30px_-15px_rgba(59,130,246,0.6),inset_0_1px_0_0_rgba(255,255,255,1)]'
          : 'border-white/60 bg-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] hover:bg-white/75'
      }`}
    >
      <span className="opacity-80">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent" />
    </motion.button>
  )
}
