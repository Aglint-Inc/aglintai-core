import { capitalize } from 'lodash';

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
  let thousandsPlace = Math.floor(num / 1000);
  let hundredsPlace = num % 1000;

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
  let hundreds = Math.floor(num / 100);
  let remainder = num % 100;

  if (hundreds > 0) {
    word += ones[hundreds] + ' hundred ';
  }
  if (remainder > 0) {
    if (remainder < 10) {
      word += ones[remainder];
    } else if (remainder < 20) {
      word += teens[remainder - 10];
    } else {
      let tensPlace = Math.floor(remainder / 10);
      let onesPlace = remainder % 10;
      word += tens[tensPlace];
      if (onesPlace > 0) {
        word += '-' + ones[onesPlace];
      }
    }
  }
  return word.trim();
}
