import { useState } from 'react';

export default function LoginCard({ onLogin }) {
  const [username, setUsername] = useState('');

  return (
    <div className="mx-auto mt-20 w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
      <h1 className="mb-2 text-2xl font-bold text-goblin-500">Goblin AI</h1>
      <p className="mb-4 text-slate-300">صديقك الذكي بدون أي API خارجي</p>
      <input
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
        placeholder="اكتب اسمك"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="w-full rounded-lg bg-goblin-500 p-3 font-semibold text-slate-950"
        onClick={() => username && onLogin(username)}
      >
        دخول
      </button>
    </div>
  );
}
