import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/main.scss';

const root = document.getElementById('root');

const NEW_COOLDOWN_MS = 5000;

createRoot(root).render(
  <StrictMode>
    <App cooldownMs={NEW_COOLDOWN_MS} />
  </StrictMode>,
);
