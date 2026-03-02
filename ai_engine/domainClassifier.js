const domainKeywords = {
  politics: ['سياسة', 'انتخابات', 'حكومة', 'ديمقراطية', 'policy', 'government'],
  movies: ['فيلم', 'سينما', 'movie', 'director', 'actor'],
  series: ['مسلسل', 'حلقة', 'season', 'episode'],
  music: ['أغنية', 'موسيقى', 'album', 'song'],
  technology: ['برمجة', 'ذكاء', 'تقنية', 'code', 'software', 'ai'],
  philosophy: ['فلسفة', 'معنى', 'existential', 'ethics'],
  gaming: ['لعبة', 'قيم', 'game', 'playstation', 'xbox'],
  relationships: ['حب', 'علاقة', 'صديق', 'dating', 'relationship']
};

export function detectDomain(text = '') {
  const sample = text.toLowerCase();

  for (const [domain, keys] of Object.entries(domainKeywords)) {
    if (keys.some((k) => sample.includes(k))) {
      return domain;
    }
  }

  return 'general';
}
