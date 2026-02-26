import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from '@/contexts/theme'
import { ReactI18nextProvider } from '@/lib/i18next'
import { TanstackQueryProvider } from '@/lib/tanstack-query'
import { TanstackRouterProvider } from '@/lib/tanstack-router'

import { ToastProvider } from './components/ui/toast'
import { TanStackDevtools } from './lib/tanstack-devtools'

import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <ReactI18nextProvider>
      <TanstackQueryProvider>
        <ThemeProvider>
          <ToastProvider>
            <TanstackRouterProvider />
            <TanStackDevtools />
          </ToastProvider>
        </ThemeProvider>
      </TanstackQueryProvider>
    </ReactI18nextProvider>
  </StrictMode>,
)
