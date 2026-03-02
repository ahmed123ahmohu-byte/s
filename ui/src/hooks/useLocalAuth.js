import { useEffect, useState } from 'react';

export function useLocalAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('goblin-user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (username) => {
    const session = { username, id: `u-${username}` };
    localStorage.setItem('goblin-user', JSON.stringify(session));
    setUser(session);
  };

  const logout = () => {
    localStorage.removeItem('goblin-user');
    setUser(null);
  };

  return { user, login, logout };
}
