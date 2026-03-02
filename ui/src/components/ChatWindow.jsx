import { useMemo } from 'react';

export default function ChatWindow({ messages }) {
  const list = useMemo(() => messages.slice(-20), [messages]);

  return (
    <div className="h-[420px] overflow-auto rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      {list.map((msg, idx) => (
        <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block max-w-[85%] rounded-xl px-3 py-2 ${msg.role === 'user' ? 'bg-goblin-700 text-white' : 'bg-slate-800 text-slate-100'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}
