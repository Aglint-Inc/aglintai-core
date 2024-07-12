/* eslint-disable security/detect-object-injection */
import { capitalize as cap } from 'lodash';

import { palette } from '@/src/context/Theme/Theme';

export const capitalize = (str: string) => {
  return (
    (str ?? '').trim().charAt(0).toUpperCase() + str.substring(1)
  ).replaceAll('_', ' ');
};

export const capitalizeAll = (str: string) => {
  if (!str) return '';
  return str
    .replaceAll('_', ' ')
    .split(' ')
    .map((item) => cap(item))
    .join(' ');
};

export function capitalizeSentence(
  sentence: string,
  ignoreWords = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'a', 'an'],
) {
  // Split the sentence into words

  let words = sentence.split(' ');
  // Capitalize the first letter of each word, ignoring specified words

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    // Check if the word should be ignored
    if (!ignoreWords.includes(word.toLowerCase())) {
      // Capitalize the first letter
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  // Join the words back into a sentence
  return words.join(' ');
}
// export const capitalizeFirstLatter = (text: string) => {
//   let capitalizeText = '';
//   const words = text.split(' ');
//   words.forEach((word) => {
//     if (word && word[0] === word[0].toLocaleLowerCase()) {
//       capitalizeText += capitalize(word) + ' ';
//     } else {
//       capitalizeText += word + ' ';
//     }
//   });
//   return capitalizeText;
// };
export const getRandomColor = (): string => {
  const colors = [
    'black',
    'grey',
    'main',
    'blue',
    'green',
    'red',
    'kale',
    'yellow',
    'purple',
    'royal',
    'fuschia',
    'azure',
    'pink',
    'teal',
    'crimson',
    'mint',
    'orange',
    'lime',
    'lemon',
  ];
  colors.splice(colors.indexOf('white'), 1);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return palette[String(randomColor)][400] || palette[String(randomColor)][500];
};
export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';

  return text
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => {
      if (
        word &&
        word.toLowerCase() !== 'and' &&
        word[0] === word[0].toLowerCase()
      ) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(' ');
};
