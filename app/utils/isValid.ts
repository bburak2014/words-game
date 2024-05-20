import { englishDictionary, turkishDictionary } from "./dictionary";
export const isValidWord = (word: string, language: 'en' | 'tr'): boolean => {
    const dictionary = language === 'en' ? englishDictionary : turkishDictionary;
    const wordLower = word.toLowerCase();
    return dictionary.some((dictWord) => dictWord.toLowerCase() === wordLower);
  };