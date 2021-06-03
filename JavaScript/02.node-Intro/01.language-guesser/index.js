const franc = require('franc');
const langs = require('langs');

const phrase = process.argv[2];

console.log(langs.where('3', franc(phrase)).name);
