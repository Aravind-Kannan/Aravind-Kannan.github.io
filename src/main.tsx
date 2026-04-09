import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './hooks/useTheme.tsx'
import { TerminalProvider } from './context/TerminalContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TerminalProvider>
        <App />
      </TerminalProvider>
    </ThemeProvider>
  </StrictMode>,
)
