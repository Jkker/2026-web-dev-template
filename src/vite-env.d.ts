/// <reference types="vite/client" />
/// <reference types="vitest/importMeta" />
/**
 * Reset TypeScript's built-in types to a more sane default.
 *
 * @see https://www.totaltypescript.com/ts-reset
 */
/// <reference types="@total-typescript/ts-reset" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // See https://vite.dev/guide/env-and-mode#intellisense-for-typescript for more details.
  strictImportMetaEnv: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'csstype' {
  interface Properties {
    /**
     * Support for CSS custom properties
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
     */
    [property: `--${string}`]: string | number | undefined
  }
}
