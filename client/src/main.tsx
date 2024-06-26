import React from 'react';
import './modified-tailwind-preflight.css';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { WagmiConfig } from 'wagmi';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { wagmiConfig } from '@/utils/wagmiConfig.ts';
import { Toaster } from '@/components/ui/toaster.tsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

// material ui theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#38761d',
      contrastText: '#1D1D24',
    },
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeProvider theme={theme}>
          <WagmiConfig config={wagmiConfig}>
               <App />
            <Toaster />
          </WagmiConfig>
        </ThemeProvider>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>
);
