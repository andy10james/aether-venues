import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/browser";
import { App } from './App';
import './index.css';

Sentry.init({
  environment: process.env.REACT_APP_FFXIV_VENUES_SENTRY_ENVIRONMENT,
  dsn: process.env.REACT_APP_FFXIV_VENUES_SENTRY_DSN
});

const root = createRoot(document.querySelector('.app-root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
