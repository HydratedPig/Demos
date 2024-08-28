const babel = require('@babel/core');
const fs = require('node:fs');

async function transformAsync(filename, defaultCfg = {}) {
  const fullFilename = `${filename}.js`
  const cfg = await babel.loadPartialConfigAsync({
    ...defaultCfg,
    filename: fullFilename,
  });
  console.log(`${filename}:`);
  if (cfg) {
    const source = fs.readFileSync(fullFilename);
    const { code, ast, map } = await babel.transformAsync(source, { ...cfg.options, filename: fullFilename });
    console.log(code)
  } else {
    console.log(`${fullFilename} config is null`)
  }
}

async function babelRunner() {
  console.log('babelRunner1')
  await transformAsync('ignore');
  await transformAsync('main');
  console.log(``);
}
async function babelRunner2() {
  console.log('babelRunner2');
  const cfg = { babelrc: false };
  await transformAsync('ignore', cfg);
  await transformAsync('main', cfg);
}

async function main() {
  await babelRunner();
  await babelRunner2();
}

main();
