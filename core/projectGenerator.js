const templates = {
  web: {
    name: 'Full-stack Web Starter',
    stack: ['React', 'Express', 'SQLite'],
    phases: ['UI design', 'API contracts', 'State management', 'Testing pipeline']
  },
  game: {
    name: 'Indie Game Prototype',
    stack: ['TypeScript', 'Canvas API', 'Node services'],
    phases: ['Game loop', 'Physics', 'Narrative', 'Save system']
  },
  ai: {
    name: 'AI Automation Suite',
    stack: ['Python', 'FastAPI', 'Vector memory'],
    phases: ['Data ingestion', 'Reasoning layer', 'Feedback loop', 'Eval tests']
  }
};

export function generateProjectIdeas(topic = 'web') {
  const selected = templates[topic] || templates.web;
  return {
    headline: `Idea: ${selected.name}`,
    stack: selected.stack,
    roadmap: selected.phases.map((phase, idx) => `${idx + 1}. ${phase}`)
  };
}
