export default 
Array.from({length: 26}, (_, i) => String.fromCharCode(i+65))
.concat('breakingLine')
.concat(
  Array.from({length: 26}, (_, i) => String.fromCharCode(i+97))
).map(c => ({ char: c }))