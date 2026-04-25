import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeModeProvider } from './context/ThemeModeContext';
import App from './App';

import '@/styles/tokens.css';
import '@/styles/global.css';
import '@/styles/layout.css';

import '@/styles/components/cards.css';
import '@/styles/components/forms.css';
import '@/styles/components/navbar.css';
import '@/styles/components/sidebar.css';

import '@/styles/pages/auth.css';
import '@/styles/pages/not-found.css';
import '@/styles/pages/faq.css'
import '@/styles/pages/profile.css';

import { LangProvider } from './context/LangContext';
import { ToastProvider } from './context/ToastContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <ThemeModeProvider>
          <ToastProvider>
            <CssBaseline />
            <AuthProvider>
              <App />
            </AuthProvider>
          </ToastProvider>
        </ThemeModeProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
);