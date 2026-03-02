import { updateMood, moodBadge } from './moodSystem.js';

const styleByMode = {
  expert: 'خلّيني أتكلم كمهندس معماري: هنقسم المشكلة لطبقات، ونحدد trade-offs بوضوح.',
  'political-analyst': 'تحليل سياسي سريع: لازم نفصل بين الخطاب الإعلامي والمصلحة الفعلية للأطراف.',
  'best-friend': 'يا صاحبي أنا معاك خطوة بخطوة، قولّي اللي في بالك بدون فلترة.'
};

export function buildPersonalityResponse({ message, session }) {
  const mood = updateMood(session);
  const opener = styleByMode[session.mode] || styleByMode['best-friend'];
  const memoryHint = session.messages.slice(-3).map((m) => m.text).join(' | ');

  return [
    `${moodBadge(mood)} جوبلن هنا!`,
    opener,
    `أنا فاكر آخر نقاط بيننا: ${memoryHint || 'لسه بنبدأ الرحلة.'}`,
    `ردّي على رسالتك: "${message}" => خلّيني أقترح 3 خطوات عملية وبعدها نطوّرها مع بعض.`
  ].join('\n\n');
}
