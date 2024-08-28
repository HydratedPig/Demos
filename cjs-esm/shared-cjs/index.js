
const a = 'aaa';
const c = __dirname;

exports.d = 'ddd';

// d will be dropped by module.exports = ...
module.exports = {
  a,
  b: 'bbb',
  c
}