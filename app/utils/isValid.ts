import { englishDictionary, turkishDictionary } from "./dictionary";

export const isValidWord = (word: string, language: 'en' | 'tr', letters: string[]): boolean => {
  
  const dictionary = language === 'en' ? englishDictionary : turkishDictionary;
  const wordLower = word.toLowerCase();
  const lettersLower = letters.map(letter => letter.toLowerCase());

  return dictionary.includes(wordLower) && [...wordLower].every(char => lettersLower.includes(char));
};

