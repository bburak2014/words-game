"use client"

import { useState, useEffect } from 'react';
import LetterDisplay from './LetterDisplay';
import WordInput from './WordInput';
import ScoreDisplay from './ScoreDisplay';
import TimerDisplay from './TimerDisplay';
import { getRandomLetters } from '../utils/getRandomLetters';
import { isValidWord } from '../utils/isValid';
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

        const isValid = isValidWord(word, language);
        setScore(prevScore => prevScore + (isValid ? word.length : 0));
        setWord(null);
        setLetters(getRandomLetters(language));
        setTimeLeft(prevTime => Math.max(prevTime + 15, 0));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setWord(event.currentTarget.value);

    const gameOverMessage = gameOver && (
        <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-bold text-red-500">
                Time's up! Your final score is {score}.
            </div>
        </div>
    );



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4">
                <LetterDisplay letters={letters} />
                <WordInput word={word} onChange={handleInputChange} gameOver={gameOver} />
                <button
                    type="submit"
                    className="px-4 py-2 text-lg text-white bg-blue-500 rounded"
                    disabled={gameOver || word === null}
                >
                    Submit
                </button>
                <TimerDisplay timeLeft={timeLeft} />
                <ScoreDisplay score={score} />
            </div>
            {gameOverMessage}
        </form>
    );
};

export default Game;
