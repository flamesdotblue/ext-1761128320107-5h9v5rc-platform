import React, { useState } from 'react'

export default function SettingsScreen() {
  const [cloudSync, setCloudSync] = useState(true)
  const [haptics, setHaptics] = useState(true)
  const [glassDepth, setGlassDepth] = useState(0.75)

  return (
    <div className="space-y-5">
      <div className="px-2">
        <h2 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-lg font-semibold text-transparent">Settings</h2>
        <p className="text-xs text-slate-500">Fine-tune motion, depth, and sync.</p>
      </div>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Panel>
          <Row label="iCloud Sync" description="Keep notes updated across devices">
            <GlassToggle checked={cloudSync} onChange={setCloudSync} accent="emerald" />
          </Row>
          <Row label="Haptics" description="Subtle taps on interaction">
            <GlassToggle checked={haptics} onChange={setHaptics} accent="sky" />
          </Row>
          <Row label="Glass Depth" description="Amount of background blur and parallax">
            <DepthSlider value={glassDepth} onChange={setGlassDepth} />
          </Row>
        </Panel>
        <Panel>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-800">Appearance</h3>
            <p className="text-xs text-slate-500">Typography: San Francisco · Accents: Ice Blue</p>
            <div className="mt-3 flex items-center gap-2">
              {['#e5f0ff','#d2ecff','#cfe8ff','#eaf6ff'].map((c, i) => (
                <span key={i} className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)]">
                  <span className="absolute inset-0" style={{ background: `linear-gradient(145deg, ${c}, rgba(255,255,255,0.8))` }} />
                  <span className="absolute inset-0 rounded-2xl ring-1 ring-white/60" />
                </span>
              ))}
            </div>
          </div>
        </Panel>
      </section>
    </div>
  )
}

function Panel({ children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-4 shadow-[0_20px_60px_-30px_rgba(31,41,55,0.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_140px_at_10%_-5%,rgba(255,255,255,0.85),transparent)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/60" />
      <div className="relative space-y-4">{children}</div>
    </div>
  )
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/50 p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)]">
      <div>
        <div className="text-sm font-medium text-slate-800">{label}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function GlassToggle({ checked, onChange, accent = 'sky' }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-14 items-center rounded-2xl border border-white/70 bg-white/60 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] transition-colors ${
        checked ? 'bg-white/70' : ''
      }`}
    >
      <span
        className={`absolute inset-0 rounded-2xl ${
          checked
            ? `bg-gradient-to-br from-${accent}-300/60 via-white/40 to-white/20`
            : 'bg-gradient-to-br from-white/40 to-white/20'
        }`}
      />
      <span
        className={`relative inline-block h-6 w-6 translate-x-0 rounded-xl border border-white/80 bg-white/80 shadow-[0_8px_20px_-10px_rgba(59,130,246,0.5),inset_0_1px_0_0_rgba(255,255,255,1)] transition-transform ${
          checked ? 'translate-x-6' : ''
        }`}
      />
    </button>
  )
}

function DepthSlider({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-40 cursor-pointer appearance-none rounded-full bg-gradient-to-r from-sky-200/80 via-white/70 to-blue-200/80 [accent-color:#60a5fa]"
      />
      <span className="w-10 text-right text-xs text-slate-600">{Math.round(value * 100)}%</span>
    </div>
  )
}
