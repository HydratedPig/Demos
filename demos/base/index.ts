#!/usr/bin/env npx ts-node -P ./tsconfig.tsnode.json
import fs from 'node:fs';
import { cpus } from 'node:os';
import { chunk } from 'lodash-es';
import { rimrafSync } from 'rimraf'
import { resolvePathWithDirname, resolvePath } from './util';
import { existsSync } from 'node:fs'
import { loader as tscLoader } from './tsc'

const entryList = [
  'main.ts',
  'vue.tsx',
]
const distDir = resolvePathWithDirname('dist');
const configFile = 'tsconfig.json'

function writeDist(config: {
  folder: string;
  content: string;
  filename: string;
}) {
  const { folder, content, filename } = config;
  const folderDir = resolvePath(distDir, folder);
  if (!existsSync(folderDir)) {
    fs.mkdirSync(folderDir, { recursive: true });
  }
  fs.writeFileSync(resolvePath(folderDir, filename), content);
}

function build(entry: string) {
  const fileDir = resolvePathWithDirname(`./src/${entry}`)
  const content = fs.readFileSync(fileDir, 'utf-8');
  // tsc
  const tscContent = tscLoader(content, { requestDirPath: fileDir, configFile });
  writeDist({
    folder: 'tsc',
    content: tscContent,
    filename: entry.replace(/\.ts(x)?$/, '.js')
  })
  // swc
}

async function main() {
  if (existsSync(distDir)) {
    rimrafSync(distDir);
  }
  const cores = cpus().length;
  const groups = Math.ceil(entryList.length / cores);
  const chunkEntryList = chunk(entryList, groups);
  await Promise.all(chunkEntryList.map(t => Promise.all(t.map(build))));
}

main();