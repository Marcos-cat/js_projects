const phrase = '  This   is a Phrase  with Capitals  ';

const word_count = phrase
    .trim()
    .split(' ')
    .filter(c => c !== '').length;

const capital_count = phrase
    .split('')
    .filter(c => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(c)).length;

console.log(word_count);
console.log(capital_count);
