import express from 'express';
import { ContextEngine } from '../../../core/contextEngine.js';
import { runRuleEngine } from '../../../ai_engine/ruleEngine.js';
import { saveConversation, getConversation } from '../../../memory/localMemory.js';

const contextEngine = new ContextEngine();
const router = express.Router();

router.post('/chat', (req, res) => {
  const { userId = 'guest', message = '' } = req.body || {};
  const restored = getConversation(userId);

  if (contextEngine.getSession(userId).messages.length === 0 && restored.length > 0) {
    restored.forEach((msg) => contextEngine.pushMessage(userId, msg.role, msg.text));
  }

  const session = contextEngine.pushMessage(userId, 'user', message);
  const response = runRuleEngine({ message, session });
  contextEngine.pushMessage(userId, 'assistant', response);

  saveConversation(userId, contextEngine.getSession(userId).messages);

  res.json({
    reply: response,
    mood: session.mood,
    mode: session.mode,
    xp: session.xp,
    level: session.level,
    messages: session.messages.slice(-20)
  });
});

export default router;
