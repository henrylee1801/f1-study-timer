/**
 * Prefix a public asset path with the deploy base path.
 *
 * When hosted under a GitHub Pages project site the app lives at
 * `/<repo-name>/`, so raw `<img src>`, CSS `url(...)`, Howler sources, etc.
 * (anything Next.js does not rewrite automatically) must be prefixed.
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build time.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const asset = (path: string): string =>
  `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
