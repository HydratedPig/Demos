
function main() {
  setTimeout(() => {
    import('./assets/right.svg').then(i => console.warn('right', i))
  }, 1000)
}
main()