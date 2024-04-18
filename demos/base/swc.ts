#!/usr/bin/env node
import swc from '@swc/core';

console.log('swc.js')
export function loader(content: string, cfg: { requestDirPath: string, configFile: string }) {
  console.log('swcLoader')
  const { code } = swc.transformSync(content, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
      },
      transform: {
        react: {
          runtime: 'automatic',
          importSource: 'vue',
        }
      }
    }
  })
  return code;
}