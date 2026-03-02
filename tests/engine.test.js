import test from 'node:test';
import assert from 'node:assert/strict';
import { detectDomain } from '../ai_engine/domainClassifier.js';
import { analyzeSentiment } from '../ai_engine/sentiment.js';
import { ContextEngine } from '../core/contextEngine.js';

test('detectDomain identifies technology', () => {
  assert.equal(detectDomain('عايز اتعلم برمجة ذكاء اصطناعي'), 'technology');
});

test('analyzeSentiment identifies positive tone', () => {
  assert.equal(analyzeSentiment('I love this awesome platform'), 'positive');
});

test('context engine tracks xp and level', () => {
  const engine = new ContextEngine();
  engine.pushMessage('u1', 'user', 'hello');
  const session = engine.getSession('u1');
  assert.equal(session.xp, 12);
  assert.equal(session.level, 1);
});
