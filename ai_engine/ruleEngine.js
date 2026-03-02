import { buildPersonalityResponse } from '../personality/goblinPersona.js';
import { generateProjectIdeas } from '../core/projectGenerator.js';

function detectIntent(text) {
  const input = text.toLowerCase();
  if (input.includes('expert mode')) return 'expert-mode';
  if (input.includes('political mode')) return 'political-mode';
  if (input.includes('best friend')) return 'best-friend-mode';
  if (input.includes('project idea') || input.includes('فكرة مشروع')) return 'project-idea';
  if (input.includes('song') || input.includes('أغنية')) return 'song';
  if (input.includes('سيناريو') || input.includes('scenario')) return 'scenario';
  return 'chat';
}

function composeSong(topic) {
  return `🎵 يلا نكتب أغنية عن ${topic}:\n\n` +
    'في ليلة هادية والنجوم حوالينا\n' +
    'بنحلم بكرة يكون أحلى لينا\n' +
    'خطوة بخطوة هنقوى سوا\n' +
    'وجوبلن صاحبنا في كل نوا.';
}

function composeScenario(topic) {
  return `🎬 سيناريو قصير: "${topic}"\n` +
    'المشهد الأول: بطل متردد يدخل مختبر مهجور.\n' +
    'المشهد الثاني: يكتشف آلة تعيد كتابة الذكريات.\n' +
    'المشهد الثالث: يختار إنقاذ صديقه بدل استعادة ماضيه.\n' +
    'النهاية: يدرك أن المستقبل أهم من الندم.';
}

export function runRuleEngine({ message, session }) {
  const intent = detectIntent(message);

  if (intent === 'project-idea') {
    const domain = session.lastDomain === 'technology' ? 'ai' : 'web';
    const idea = generateProjectIdeas(domain);
    return `${idea.headline}\nStack: ${idea.stack.join(', ')}\n${idea.roadmap.join('\n')}`;
  }

  if (intent === 'song') {
    return composeSong(session.lastDomain || 'الحياة');
  }

  if (intent === 'scenario') {
    return composeScenario(session.lastDomain || 'المدينة الذكية');
  }

  if (intent === 'expert-mode') {
    session.mode = 'expert';
  }
  if (intent === 'political-mode') {
    session.mode = 'political-analyst';
  }
  if (intent === 'best-friend-mode') {
    session.mode = 'best-friend';
  }

  return buildPersonalityResponse({ message, session, intent });
}
