/// <reference types="vitest/config" />
import arkenvVitePlugin from '@arkenv/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import arkenv, { type } from 'arkenv'
import BabelPluginReactCompiler from 'babel-plugin-react-compiler'
import { defineConfig, loadEnv } from 'vite'

export const Env = type({
  PORT: 'number.port = 5173',
  'VITE_API_URL?': 'string.url',
  'VITE_APP_NAME?': 'string',
  VITE_ENABLE_DEBUGGING: 'boolean = false',
  VITE_API_TIMEOUT: '1000 <= number.integer <= 60000 = 5000',
})

const CI = !!process.env.CI

export default defineConfig(({ mode }) => {
  const env = arkenv(Env, { env: loadEnv(mode, process.cwd(), '') })

  return {
    plugins: [
      devtools(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      tailwindcss(),
      react({ babel: { plugins: [BabelPluginReactCompiler] } }),
      arkenvVitePlugin(Env),
    ],
    resolve: { tsconfigPaths: true },
    server: {
      port: env.PORT,
    },
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['**/*.test.ts'],
            environment: 'node',
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['./**/*.test.tsx', './**/*.test.browser.{ts,tsx}'],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
              trace: 'on-first-retry',
            },
          },
        },
      ],
      silent: 'passed-only',
      reporters: CI ? ['default', 'junit'] : [],
      outputFile: { junit: 'junit-test-report.xml' },
      coverage: {
        reportsDirectory: './coverage',
        exclude: ['src/components/ui/*', 'routeTree.gen.ts'],
        reporter: CI ? ['text', 'cobertura', 'lcov'] : ['html', 'text'],
      },
    },
    optimizeDeps: {
      include: ['react', 'react/jsx-runtime', 'react/compiler-runtime'],
    },
  }
})
