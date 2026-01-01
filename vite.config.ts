import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import BabelPluginReactCompiler from 'babel-plugin-react-compiler'
import { defineConfig } from 'vitest/config'

const CI = !!process.env.CI

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react({ babel: { plugins: [BabelPluginReactCompiler] } }),
  ],
  resolve: { tsconfigPaths: true },
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
          },
        },
      },
    ],
    reporters: CI ? ['default', 'junit'] : [],
    outputFile: { junit: 'dist/junit-test-report.xml' },
    coverage: {
      provider: 'v8',
      reportsDirectory: './dist/coverage',
      reporter: CI
        ? [
            'text', // for Gitlab CI coverage
            'cobertura', // for Gitlab CI coverage_report
            'lcov', // for SonarQube
            'json-summary', // for Badge generation
          ]
        : [
            'html',
            'text',
            'json-summary', // for Badge generation
          ],
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime', 'react/compiler-runtime'],
  },
})
