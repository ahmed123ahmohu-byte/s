import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import { signup, login } from './auth.js';
import { logInfo, logError } from '../../utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'Goblin Server' });
});

app.post('/api/signup', (req, res) => {
  try {
    const { username, password } = req.body;
    const result = signup(username, password);
    if (!result.ok) return res.status(400).json(result);
    return res.json(result);
  } catch (error) {
    logError('signup', 'failed', error);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const result = login(username, password);
    if (!result.ok) return res.status(401).json(result);
    return res.json(result);
  } catch (error) {
    logError('login', 'failed', error);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

app.use('/api', chatRouter);

app.listen(PORT, () => {
  logInfo('server', `Goblin server started on :${PORT}`);
});
