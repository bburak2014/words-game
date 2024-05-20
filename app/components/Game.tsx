"use client"

import { useState, useEffect } from 'react';
import LetterDisplay from './LetterDisplay';
import WordInput from './WordInput';
import ScoreDisplay from './ScoreDisplay';
import TimerDisplay from './TimerDisplay';
import { getRandomLetters } from '../utils/getRandomLetters';
import { isValidWord } from '../utils/isValid';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { LuSwords } from "react-icons/lu";
import Link from 'next/link';
type Props = {
    language: 'en' | 'tr';
};

const Game = ({ language }: Props) => {
    const [letters, setLetters] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [score, setScore] = useState<number>(0);
    const [word, setWord] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    useEffect(() => {
        const randomWord = getRandomLetters(language);
        setLetters(randomWord);

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setGameOver(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [language]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!word) return;

        const isValid = isValidWord(word, language, letters);
        if (isValid) {
            setScore(score + word.length);
            setTimeLeft(prevTime => prevTime + 15);
            setLetters(getRandomLetters(language));
        }
        setWord('');

    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setWord(event.currentTarget.value);

    const gameOverMessage = gameOver && (
        <div className="flex flex-col items-center gap-4 justify-center">
            {
                language === 'en' ? <p className="text-lg font-bold text-red-500 text-center">Time's up! Your final score is {score}</p> : <p className="text-lg font-bold text-red-500 text-center">Süre doldu! Sonuç: {score}</p>
            }
         </div>
    );



    return (

        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-8 sm:gap-24 h-full justify-center '>
            <Link className='absolute right-10 top-10 ' href={language === 'en' ? '/tr' : '/en'}><img src={language === 'en' ? 'turkish.png':'english.png' } width={30} /></Link>

            <motion.h1 initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className='text-xl sm:text-[calc(5vw-0.5rem)]   font-bold text-slate-100 flex gap-2 items-center justify-center'>
                <LuSwords /><span>{language === 'en' ? 'Word Spelling Game' : 'Kelime Tahmin Oyunu'}</span>
            </motion.h1 >

            <LetterDisplay letters={letters} />
            <motion.div initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }} className="flex flex-col items-center gap-8">
                <WordInput word={word} onChange={handleInputChange} gameOver={gameOver} />
                <motion.button
                    type="submit"
                    className="flex items-center px-4 py-2 text-lg text-white bg-blue-500 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={gameOver || word === null}
                >
                    <FaPaperPlane className="mr-2" />
                    {language === 'en' ? 'Send' : 'Gönder'}
                    
                </motion.button>
                <TimerDisplay timeLeft={timeLeft} language={language} />
                <ScoreDisplay score={score} language={language}/>
            </motion.div>
            {gameOverMessage}
        </form>
    );
};

export default Game;
