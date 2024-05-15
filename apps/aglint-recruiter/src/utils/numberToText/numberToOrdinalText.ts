/* eslint-disable security/detect-object-injection */
export function numberToOrdinalText(number) {
  const ordinals = [
    '',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth'
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];

  if (number < 20) {
    return ordinals[number];
  } else {
    const onesDigit = number % 10;
    const tensDigit = Math.floor(number / 10);
    return tens[tensDigit] + (onesDigit !== 0 ? '-' + ordinals[onesDigit] : '');
  }
}
