# Goblin (جوبلن) AI Agent

Goblin is an offline-first AI web assistant with a social personality, contextual memory, and multi-mode reasoning.  
No paid AI APIs are used. The intelligence layer is a local **rule-based + context processor** engine.

## Features

- **Human personality engine**: friendly style, humor, adaptive tone.
- **Context memory**: stores session history and uses it in responses.
- **Topic intelligence**: politics, movies, series, music, tech, philosophy, gaming, relationships.
- **Built-in modes**:
  - Best Friend Mode
  - Expert Mode
  - Political Analyst Mode
- **Mood System**: Goblin mood changes based on sentiment.
- **User sentiment analysis**.
- **Project idea generation**.
- **Song writing + movie scenario generation**.
- **XP + Level progression**.
- **Local login and local conversation persistence**.
- **Modern UI**: dark mode, loading animations, smooth layout.

## Project Structure

```text
/core
/ai_engine
/personality
/memory
/ui
/utils
/server
/tests
```

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- AI: Internal rule engine + context processor
- Storage: local JSON files + browser localStorage

## Local Run

```bash
npm install
npm run dev
```

- UI: `http://localhost:5173`
- API: `http://localhost:8787`

## Testing

```bash
npm test
```

## Production Build

```bash
npm run build
```

## GitHub Deployment

A workflow is available at:

- `.github/workflows/deploy.yml`

Pipeline steps:

1. Install dependencies
2. Run tests
3. Build frontend and backend
4. Deploy frontend `ui/dist` to GitHub Pages

## Upgrading the AI Engine Later

You can evolve Goblin in two directions:

1. **Local LLM runtime** (e.g., llama.cpp) via a local inference process.
2. **Hybrid architecture** where this current rule/context layer remains as safety + deterministic guardrails and an open-source model handles deep generation.

### Suggested upgrade path

- Add `/ai_engine/model_adapter.js`
- Add prompt templates and tool routing in `/core`
- Keep `/personality` and `/memory` as persistent orchestration layers

This architecture keeps Goblin fully extensible while preserving offline and privacy-friendly operation.
