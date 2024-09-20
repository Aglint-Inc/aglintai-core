import capitalize from 'lodash/capitalize';

/* eslint-disable security/detect-object-injection */
const ones = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const teens = [
  '',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const tens = [
  '',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];
const thousands = ['', 'thousand'];

export function numberToText(num) {
  if (num === 0) return 'zero';
  let word = '';
  if (num < 0) {
    word += 'minus ';
    num = Math.abs(num);
  }
  const thousandsPlace = Math.floor(num / 1000);
  const hundredsPlace = num % 1000;

  if (thousandsPlace > 0) {
    word += convertHundreds(thousandsPlace) + ' ' + thousands[1] + ' ';
  }
  if (hundredsPlace > 0) {
    word += convertHundreds(hundredsPlace);
  }
  return capitalize(word.trim());
}

function convertHundreds(num) {
  let word = '';
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds > 0) {
    word += ones[hundreds] + ' hundred ';
  }
  if (remainder > 0) {
    if (remainder < 10) {
      word += ones[remainder];
    } else if (remainder < 20) {
      word += teens[remainder - 10];
    } else {
      const tensPlace = Math.floor(remainder / 10);
      const onesPlace = remainder % 10;
      word += tens[tensPlace];
      if (onesPlace > 0) {
        word += '-' + ones[onesPlace];
      }
    }
  }
  return word.trim();
}
