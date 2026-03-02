import fs from 'node:fs';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), 'server', 'data', 'memory.json');

function safeRead() {
  if (!fs.existsSync(DB_PATH)) return {};
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveConversation(userId, messages) {
  const db = safeRead();
  db[userId] = {
    updatedAt: new Date().toISOString(),
    messages: messages.slice(-40)
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function getConversation(userId) {
  const db = safeRead();
  return db[userId]?.messages || [];
}
