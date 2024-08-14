console.log('loader???')

const cacheContainer = []
module.exports = function loader(content, map, meta) {
  if (this.cacheable) {
    this.cacheable();
  }
  const callback = this.async()
  if (this.resourcePath.includes('svg-sprite.svg')) {
    callback(null, `
      console.log('this is svg-sprite.svg')
      ${cacheContainer.map((i, idx) => {
      return `console.log('svg${idx}::', \`${i}\`)`
    }).join(';\n')
      }
      `)
    return
  }

  cacheContainer.push(content);

  const loaderContext = this;

  setTimeout(() => {
    callback(null, `
import './svg-sprite.svg';
console.log(\`${this.resourcePath}\`);
export default '${this.resourcePath}'
    `)
  }, 1000)
}