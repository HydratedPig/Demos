#!/usr/bin/env npx ts-node -P ./tsconfig.tsnode.json
import fs from 'node:fs';
import { cpus } from 'node:os';
import { chunk } from 'lodash-es';
import { rimrafSync } from 'rimraf'
import { resolvePathWithDirname, resolvePath } from './util';
import { existsSync } from 'node:fs'
import { loader as tscLoader } from './tsc'
import { loader as swcLoader } from './swc'

const entryList = [
  'main.ts',
  'vue.tsx',
]
const distDir = resolvePathWithDirname('dist');
const configFile = 'tsconfig.json';

const contentMap = new Map<string, { content: string, contentDir: string }>();

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

function getContentResult(entry: string) {
  const entryResult = contentMap.get(entry)
  if (entryResult) {
    return entryResult;
  }

  const contentDir = resolvePathWithDirname(`./src/${entry}`)
  const content = fs.readFileSync(contentDir, 'utf-8');
  const result = { content, contentDir }
  contentMap.set(entry, result);
  return result;
}

function buildTsc(entry: string) {
  const entryResult = getContentResult(entry);
  const content = tscLoader(entryResult.content, { requestDirPath: entryResult.contentDir, configFile });
  writeDist({
    folder: 'tsc',
    content: content,
    filename: entry.replace(/\.ts(x)?$/, '.js')
  })
}

function buildSwc(entry: string) {
  const entryResult = getContentResult(entry);
  const content = swcLoader(entryResult.content, { requestDirPath: entryResult.contentDir, configFile });
  writeDist({
    folder: 'swc',
    content: content,
    filename: entry.replace(/\.ts(x)?$/, '.js')
  })
}

function build(entry: string, type: 'tsc' | 'swc' = 'tsc') {
  switch (type) {
    case 'tsc': {
      buildTsc(entry);
      break;
    }
    case 'swc': {
      buildSwc(entry)
      break;
    }
  }
}

async function main() {
  if (existsSync(distDir)) {
    rimrafSync(distDir);
  }
  const cores = cpus().length;
  const groups = Math.ceil(entryList.length / cores);
  const chunkEntryList = chunk(entryList, groups);
  console.time('build-tsc');
  await Promise.all(chunkEntryList.map(eList => Promise.all(eList.map((e) => build(e, 'tsc')))));
  console.timeEnd('build-tsc');
  console.time('build-swc');
  await Promise.all(chunkEntryList.map(eList => Promise.all(eList.map((e) => build(e, 'swc')))));
  console.timeEnd('build-swc');
}

main();