import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const USERS_PATH = path.join(process.cwd(), 'server', 'data', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_PATH)) return {};
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function signup(username, password) {
  const users = readUsers();
  if (users[username]) {
    return { ok: false, error: 'User already exists' };
  }

  users[username] = {
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };

  writeUsers(users);
  return { ok: true };
}

export function login(username, password) {
  const users = readUsers();
  const user = users[username];
  if (!user) return { ok: false, error: 'User not found' };

  if (user.passwordHash !== hashPassword(password)) {
    return { ok: false, error: 'Invalid password' };
  }

  const token = crypto.randomBytes(16).toString('hex');
  return { ok: true, token };
}
