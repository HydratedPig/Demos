
```sh
yarn
node index.js
```

The result I prefer is
```sh
babelRunner1
ignore:
console.log('ignore');
main:
console.log('main');

babelRunner2
ignore:
console.log('ignore');
main:
console.log('main');
```

But the truth is

```sh
babelRunner1
ignore:
ignore.js config is null
main:
console.log('main');

babelRunner2
ignore:
console.log('ignore');
main:
console.log('main');
```