import { detectDomain } from '../ai_engine/domainClassifier.js';
import { analyzeSentiment } from '../ai_engine/sentiment.js';

export class ContextEngine {
  constructor() {
    this.sessions = new Map();
  }

  getSession(userId = 'guest') {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        messages: [],
        mood: 'playful',
        xp: 0,
        level: 1,
        mode: 'best-friend',
        profile: {
          preferredTone: 'friendly',
          interests: []
        }
      });
    }
    return this.sessions.get(userId);
  }

  pushMessage(userId, role, text) {
    const session = this.getSession(userId);
    const sentiment = role === 'user' ? analyzeSentiment(text) : 'neutral';
    const domain = role === 'user' ? detectDomain(text) : session.lastDomain || 'general';

    session.messages.push({
      role,
      text,
      sentiment,
      domain,
      timestamp: Date.now()
    });

    if (session.messages.length > 60) {
      session.messages = session.messages.slice(-60);
    }

    if (role === 'user') {
      session.lastDomain = domain;
      session.lastSentiment = sentiment;
      session.xp += 12;
      session.level = 1 + Math.floor(session.xp / 120);
    }

    return session;
  }

  summarizeRecent(userId, size = 8) {
    const session = this.getSession(userId);
    return session.messages.slice(-size).map((msg) => `${msg.role}: ${msg.text}`).join('\n');
  }

  setMode(userId, mode) {
    const session = this.getSession(userId);
    session.mode = mode;
    return session;
  }

  updatePreferredTone(userId, tone) {
    const session = this.getSession(userId);
    session.profile.preferredTone = tone;
    return session;
  }
}
