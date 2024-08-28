
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function resolvePathWithDirname(relatedPath: string) {
  return resolvePath(__dirname, relatedPath)
}

export function resolvePath(a: string, b: string) {
  return path.resolve(a, b);
}