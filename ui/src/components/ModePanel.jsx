export default function ModePanel({ mode, setMode }) {
  const modes = [
    { key: 'best-friend', label: 'Best Friend' },
    { key: 'expert', label: 'Expert Mode' },
    { key: 'political-analyst', label: 'Political Analyst' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((m) => (
        <button
          key={m.key}
          className={`rounded-full px-3 py-1 text-sm ${mode === m.key ? 'bg-goblin-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
          onClick={() => setMode(m.key)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
