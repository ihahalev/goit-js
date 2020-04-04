'use strict';

const formatString = function(string) {
  const srtLength = 40;
  if (string.length > srtLength) {
    let formatedString = string.slice(0, srtLength);
    formatedString += '...';
    return formatedString;
  }
  return string;
};

console.log(formatString('Curabitur ligula sapien, tincidunt non.'));

console.log(formatString('Vestibulum facilisis, purus nec pulvinar iaculis.'));

console.log(formatString('Curabitur ligula sapien.'));

console.log(
  formatString(
    'Nunc sed turpis. Curabitur a felis in nunc fringilla tristique.',
  ),
);
