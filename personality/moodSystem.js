const moodRules = {
  positive: 'hyped',
  negative: 'supportive',
  neutral: 'playful'
};

export function updateMood(session) {
  const mood = moodRules[session.lastSentiment || 'neutral'] || 'playful';
  session.mood = mood;
  return mood;
}

export function moodBadge(mood) {
  const badges = {
    hyped: '🚀 متحمس',
    supportive: '🤝 داعم',
    playful: '😎 رايق'
  };
  return badges[mood] || '😎 رايق';
}
