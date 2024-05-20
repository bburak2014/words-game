
import { englishDictionary ,turkishDictionary} from "./dictionary";
export const getRandomLetters = (language: 'en' | 'tr'): string[] => {
    const dictionary = language === 'en' ? englishDictionary : turkishDictionary;
    const vowels = language === 'en'
      ? ['A', 'E', 'I', 'O', 'U']
      : ['A', 'E', 'I', 'O', 'U', 'Ü', 'Ö', 'İ'];
  
    const sevenLetterWords = dictionary.filter(word => word.length <= 7);
    const randomWordIndex = Math.floor(Math.random() * sevenLetterWords.length);
    const randomWord = sevenLetterWords[randomWordIndex].toUpperCase();
  
    const lettersLength = 7 - randomWord.length > 0 ? 7 - randomWord.length : 0;
    const letters: string[] = new Array(lettersLength).fill(0).map(() => {
      return Math.random() < 0.2 ? vowels[Math.floor(Math.random() * vowels.length)] : String.fromCharCode(
        65 + Math.floor(Math.random() * 26),
      );
    }).concat(randomWord.split(''));
  
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
  
    return letters;
  };