import { useEffect, useState } from 'react';
import LoginCard from './components/LoginCard.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import ModePanel from './components/ModePanel.jsx';
import { useLocalAuth } from './hooks/useLocalAuth.js';

const API = 'http://localhost:8787/api';

export default function App() {
  const { user, login, logout } = useLocalAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('best-friend');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('goblin-chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('goblin-chat', JSON.stringify(messages));
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const outgoing = { role: 'user', text: input };
    setMessages((prev) => [...prev, outgoing]);
    setLoading(true);

    const messageToSend = input;
    setInput('');

    try {
      const response = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || 'guest', message: `${mode} ${messageToSend}` })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '⚠️ السيرفر مش متاح، شغّل backend على المنفذ 8787.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <LoginCard onLogin={login} />;
  }

  return (
    <main className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-950'} min-h-screen p-6 transition-colors`}>
      <div className="mx-auto max-w-4xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div>
            <h1 className="text-xl font-bold text-goblin-500">Goblin • جوبلن</h1>
            <p className="text-sm text-slate-300">Welcome {user.username} | XP: {xp} | Level: {level}</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-slate-700 px-3 py-2" onClick={() => setDarkMode((v) => !v)}>Dark Mode</button>
            <button className="rounded-lg bg-rose-600 px-3 py-2" onClick={logout}>Logout</button>
          </div>
        </header>

        <ModePanel mode={mode} setMode={setMode} />
        <ChatWindow messages={messages} />

        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="اكتب رسالتك لجوبلن..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="rounded-lg bg-goblin-500 px-4 py-3 font-semibold text-slate-900" onClick={sendMessage}>
            إرسال
          </button>
        </div>

        {loading && <div className="animate-pulse text-goblin-500">جوبلن بيفكّر... ⚙️</div>}
      </div>
    </main>
  );
}
