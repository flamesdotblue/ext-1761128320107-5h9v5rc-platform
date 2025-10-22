import React from 'react'

export default function ProfileScreen() {
  return (
    <div className="space-y-5">
      <div className="px-2">
        <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-lg font-semibold text-transparent">Profile</h2>
        <p className="text-xs text-slate-500">Identity with neon-blue accents and depth.</p>
      </div>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <CirclePanel>
          <AvatarMonolith />
          <div className="mt-3 text-center">
            <div className="text-sm font-semibold text-slate-800">Alex Rivers</div>
            <div className="text-xs text-slate-500">Designer · VisionOS</div>
          </div>
        </CirclePanel>
        <InfoPanel title="Stats" items={[
          { label: 'Notes', value: '128' },
          { label: 'Folders', value: '9' },
          { label: 'Last Sync', value: 'Just now' },
        ]} />
        <InfoPanel title="Devices" items={[
          { label: 'iPhone', value: 'Online' },
          { label: 'iPad', value: 'Online' },
          { label: 'Mac', value: 'Idle' },
        ]} />
      </section>
    </div>
  )
}

function CirclePanel({ children }) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-6 shadow-[0_20px_60px_-30px_rgba(31,41,55,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.35),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/60" />
      <div className="relative">{children}</div>
    </div>
  )
}

function AvatarMonolith() {
  return (
    <div className="relative">
      <div className="relative size-36 overflow-hidden rounded-full border border-white/70 bg-white/70 shadow-[0_25px_50px_-20px_rgba(59,130,246,0.55),inset_0_1px_0_0_rgba(255,255,255,1)]">
        <div className="absolute inset-0 bg-[radial-gradient(140px_60px_at_40%_20%,rgba(255,255,255,0.95),transparent)]" />
        <div className="absolute inset-0" style={{ background: 'conic-gradient(from 210deg, rgba(14,165,233,0.35), rgba(59,130,246,0.35), rgba(99,102,241,0.3), rgba(14,165,233,0.35))' }} />
        <div className="absolute inset-0 rounded-full ring-1 ring-white/70" />
      </div>
      <span className="pointer-events-none absolute -bottom-2 left-1/2 h-3/5 w-3/5 -translate-x-1/2 rounded-full bg-blue-400/50 blur-2xl" />
    </div>
  )
}

function InfoPanel({ title, items }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-4 shadow-[0_20px_60px_-30px_rgba(31,41,55,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(300px_120px_at_10%_-10%,rgba(255,255,255,0.9),transparent)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/60" />
      <div className="relative space-y-3">
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/50 px-3 py-2 text-sm text-slate-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)]">
              <span className="text-slate-600">{it.label}</span>
              <span className="text-slate-800">{it.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
