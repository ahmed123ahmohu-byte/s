const positive = ['happy', 'great', 'love', 'مبسوط', 'رائع', 'ممتاز', 'awesome'];
const negative = ['sad', 'angry', 'hate', 'زعلان', 'سيء', 'متضايق', 'worst'];

export function analyzeSentiment(text = '') {
  const lowered = text.toLowerCase();
  const p = positive.filter((word) => lowered.includes(word)).length;
  const n = negative.filter((word) => lowered.includes(word)).length;

  if (p > n) return 'positive';
  if (n > p) return 'negative';
  return 'neutral';
}
