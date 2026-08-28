
# Advice Generator — Three-Day React Course Project

A complete instructor reference for restarting **Level 3, Week 3: React** with one evolving project. The implementation is based on Frontend Mentor's Advice Generator App challenge and uses the Advice Slip API.

## Teaching progression

| Day                   | Branch checkpoint                                   | Primary concepts                                                                                              |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Day 1 — Aug 25, 2026 | `feature/day-1-ui` / `v1-day-1-ui`              | Vite, React root, JSX, components, props,`useState`, events, Sass, BEM, responsive design                   |
| Day 2 — Aug 26, 2026 | `feature/day-2-api` / `v2-day-2-api`            | Axios, environment variables, API service,`useEffect`, custom hook, loaders, errors, cancellation, cooldown |
| Day 3 — Aug 27, 2026 | `feature/day-3-testing-deployment` / `v3-final` | Vitest, Testing Library, mocks, coverage, pull requests, Netlify, production verification                     |

`main` contains the final merged implementation. The feature branches remain available as runnable historical checkpoints.

## Requirements

- Node.js 22.12 or newer
- npm
- Git
- GitHub account
- Netlify account for Day 3

## Run the final project

```bash
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The local environment file must contain:

```env
VITE_ADVICE_API_URL=https://api.adviceslip.com
```

## Quality commands

```bash
npm run lint
npm test
npm run test:run
npm run test:coverage
npm run build
npm run check
npm run preview
```

`npm install` generates `package-lock.json`. Commit that lockfile in the live classroom repository before opening the first pull request so every environment installs the same dependency graph.

## Final source structure

```text
.
├── .github/
│   ├── workflows/quality.yml
│   └── pull_request_template.md
├── docs/
│   ├── day-1/README.md
│   ├── day-2/README.md
│   └── day-3/README.md
├── public/images/
│   ├── icon-dice.svg
│   ├── pattern-divider-desktop.svg
│   └── pattern-divider-mobile.svg
├── src/
│   ├── components/
│   │   ├── AdviceButton/
│   │   │   ├── AdviceButton.jsx
│   │   │   └── AdviceButton.test.jsx
│   │   └── AdviceCard/AdviceCard.jsx
│   ├── hooks/useAdvice.js
│   ├── services/adviceApi.js
│   ├── styles/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   └── main.scss
│   ├── test/setup.js
│   ├── App.jsx
│   ├── App.test.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── .nvmrc
├── .npmrc
├── .eslint.config.js
├── index.html
├── netlify.toml
├── package.json
└── vite.config.js
```
