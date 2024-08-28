#!/usr/bin/env node
import compiler from 'typescript';
import path from 'node:path';

let cache: compiler.ParsedCommandLine;

function findConfigFile(
  requestDirPath: string,
  configFile = 'tsconfig.json'
) {
  // If `configFile` is a relative path, resolve it.
  // We define a relative path as: starts with
  // one or two dots + a common directory delimiter
  while (true) {
    const fileName = path.join(requestDirPath, configFile);
    if (compiler.sys.fileExists(fileName)) {
      return fileName;
    }
    const parentPath = path.dirname(requestDirPath);
    if (parentPath === requestDirPath) {
      break;
    }
    requestDirPath = parentPath;
  }
  return ''
}

function getConfigFile(cfg: { requestDirPath: string, configFile: string }) {
  const configFilePath = findConfigFile(cfg.requestDirPath, cfg.configFile);
  return {
    configFile: compiler.readConfigFile(configFilePath, compiler.sys.readFile),
    configFilePath
  }
}

function getConfig(cfg: { requestDirPath: string, configFile: string }) {
  if (cache) return cache;
  const { configFile, configFilePath } = getConfigFile(cfg);
  cache = compiler.parseJsonConfigFileContent(
    configFile.config,
    compiler.sys,
    path.dirname(configFilePath)
  );
  return cache
}

export function loader(content: string, cfg: { requestDirPath: string, configFile: string }) {
  const config = getConfig(cfg);
  const result = compiler.transpileModule(content, {
    compilerOptions: config.options
  });
  return result.outputText;
}