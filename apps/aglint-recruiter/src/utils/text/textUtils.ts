/* eslint-disable security/detect-object-injection */
import { capitalize as cap } from 'lodash';

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

  const words = sentence.split(' ');
  // Capitalize the first letter of each word, ignoring specified words

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

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

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';

  if (typeof text !== 'string') return text;
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
